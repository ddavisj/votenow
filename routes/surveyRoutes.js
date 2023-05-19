const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
   app.delete('/api/surveys/delete/:id', async (req, res) => {
      await Survey.deleteOne({ _id: req.params.id }).exec();

      // res.send(`Deleted! ${req.params.id}`);
      // console.log(`Route - deleting: ${req.params.id}`);
      // res.redirect('/surveys');
      // res.send([]);
   });

   app.get('/api/surveys', requireLogin, async (req, res) => {
      try {
         const surveys = await Survey.find({ _user: req.user.id }).select({
            recipients: false,
         });

         res.send(surveys);
      } catch (err) {
         res.status(422).send(err);
      }
   });

   app.get('/api/surveys/:surveyId/:choice', (req, res) => {
      res.send(`Thanks for voting!`);
      // res.send(`
      //    <html lang="en">
      //    <head>
      //       <meta charset="UTF-8" />
      //       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      //       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      //       <link
      //          href="https://fonts.googleapis.com/icon?family=Material+Icons"
      //          rel="stylesheet"
      //       />
      //       <title>VoteNow - Thanks</title>
      //    </head>
      //    <body>
      //       <nav style="background-color: green">
      //          <div class="nav-wrapper">
      //             <a
      //                class="left brand-logo"
      //                href="/surveys"
      //                style="padding-left: 10px"
      //                >VoteNow</a
      //             >
      //          </div>
      //       </nav>
      //       <h3 style="text-align: center">Thanks for voting!</h3>
      //    </body>
      // </html>`);
   });

   app.post('/api/surveys/webhooks', (req, res) => {
      const p = new Path('/api/surveys/:surveyId/:choice');

      _.chain(req.body) // process the incoming req
         .map(({ email, url }) => {
            // destruct from event
            const match = p.test(new URL(url).pathname);
            if (match) {
               return { email, ...match };
            }
         })
         .compact()
         .uniqBy('email', 'surveyId')
         .each(({ surveyId, email, choice }) => {
            Survey.updateOne(
               {
                  id: surveyId,
                  recipients: {
                     $elemMatch: { email: email, responded: false },
                     lastResponded: new Date(),
                  },
               },
               {
                  $inc: { [choice]: 1 },
                  $set: { 'recipients.$.responded': true },
                  lastResponded: new Date(),
               }
            ).exec();
         })
         .value();

      res.send({});
   });

   app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
      const { title, subject, body, recipients } = req.body;

      const survey = new Survey({
         title,
         subject,
         body,
         recipients: recipients
            .split(',')
            .map(email => ({ email: email.trim() })),
         _user: req.user.id,
         dateSent: Date.now(),
      });

      // Great place to send an email!
      const mailer = new Mailer(survey, surveyTemplate(survey));

      try {
         await mailer.send();
         await survey.save();
         req.user.credits -= 1;
         const user = await req.user.save(); // get the freshest copy of the user

         res.send(user);
      } catch (err) {
         res.status(422).send(err);
      }
   });
};
