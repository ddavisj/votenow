import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';

const SurveyList = ({ fetchSurveys, surveys, deleteSurvey }) => {
   useEffect(() => {
      fetchSurveys();
   }, []);

   const renderSurveys = () => {
      // Convert date to sortable format, e.g. "dateSent": "2023-07-03T08:53:11.757Z" to: 1688374391757
      const dateMapped = surveys.map(survey => {
         return {
            ...survey,
            dateSent: Date.parse(survey.dateSent),
         };
      });

      dateMapped.sort((a, b) => b.dateSent - a.dateSent); // Sort in descending order

      if (surveys.length) {
         return dateMapped.map(survey => {
            return (
               <div className="card blue-grey darken-1" key={survey._id}>
                  <div className="card-content white-text">
                     <span className="card-title">{survey.title}</span>
                     <p>{survey.body}</p>
                     <p className="right">
                        Sent on:{' '}
                        {new Date(survey.dateSent).toLocaleDateString()}
                     </p>
                  </div>
                  <div className="card-action">
                     <span className="votes">Yes: {survey.yes}</span>
                     <span className="votes">No: {survey.no}</span>
                     <button
                        onClick={() => {
                           deleteSurvey(survey._id);
                        }}
                     >
                        Delete
                     </button>
                  </div>
               </div>
            );
         });
      }
   };

   return <div style={{ paddingTop: '25px' }}>{renderSurveys()}</div>;
};

function mapStateToProps(state) {
   return { surveys: state.surveys };
}

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(
   SurveyList
);
