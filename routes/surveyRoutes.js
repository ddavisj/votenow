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
      res.send([]);
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
   });

   app.post('/api/surveys/webhooks', (req, res) => {
      console.log('req.body', req.body);

      const p = new Path('/api/surveys/:surveyId/:choice');

      _.chain(req.body) // process the incoming req body and chain on all steps
         .map(({ email, url }) => {
            // get email and url from the incoming event array
            // destruct from event
            const match = p.test(new URL(url).pathname); // get pathname prop from url via helper
            console.log('match', match);

            if (match) {
               // if pathname acquired
               // console.log('pathname (match): ', match);
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
                  },
               },
               {
                  $inc: { [choice]: 1 },
                  $set: { 'recipients.$.responded': true },
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
