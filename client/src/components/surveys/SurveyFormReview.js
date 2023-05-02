// SFR shows users their form inputs for review
import React from 'react';
import { connect } from 'react-redux';

import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
   const reviewFields = formFields.map(({ label, name }) => (
      <div key={name}>
         <label>{label}</label>
         <div>{formValues[name]}</div>
      </div>
   ));

   return (
      <div>
         <h5>Please confirm your entries</h5>
         {reviewFields}
         <button
            onClick={onCancel}
            className="yellow darken-3 white-text btn-flat"
         >
            Back
         </button>
         <button
            onClick={() => submitSurvey(formValues, history)}
            className="teal white-text btn-flat right"
         >
            Send Survey
            <i className="material-icons right">email</i>
         </button>
      </div>
   );
};

function mapStateToProps(state) {
   return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
