import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';

class SurveyList extends Component {
   componentDidMount() {
      this.props.fetchSurveys();
   }

   // componentDidUpdate(state) {
   //    console.log(state);
   // }

   renderSurveys() {
      const surveys = this.props.surveys;
      if (surveys.length) {
         // console.log('A', surveys);
         //  return surveys.map(survey => {
         return this.props.surveys.reverse().map(survey => {
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
                           // console.log('Del');
                           this.props.deleteSurvey(survey._id);
                        }}
                     >
                        Delete
                     </button>
                  </div>
               </div>
            );
         });
      }
   }

   render() {
      return <div>{this.renderSurveys()}</div>;
   }
}

function mapStateToProps(state) {
   // console.log('state', state);
   return { surveys: state.surveys };
}

export default connect(mapStateToProps, { fetchSurveys, deleteSurvey })(
   SurveyList
);
