// SurveyForm shows a form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

import formFields from './formFields';

class SurveyForm extends Component {
   renderFields() {
      return formFields.map(({ label, name }) => {
         return (
            <Field
               key={name}
               label={label}
               type="text"
               name={name}
               component={SurveyField}
            />
         );
      });
   }

   render() {
      return (
         <div style={{ paddingTop: '25px' }}>
            <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
               {this.renderFields()}
               <Link to="/surveys" className="red btn-flat white-text">
                  Cancel
               </Link>
               <button
                  type="submit"
                  className="my-green-bg btn-flat right white-text"
               >
                  Next
                  <i className="material-icons right">chevron_right</i>
               </button>
            </form>
         </div>
      );
   }
}

function validate(values) {
   const errors = {};

   errors.recipients = validateEmails(values.recipients || '');

   formFields.forEach(({ name }) => {
      if (!values[name]) {
         errors[name] = `You must provide a value`;
      }
   });

   return errors;
}

export default reduxForm({
   validate,
   form: 'surveyForm',
   destroyOnUnmount: false,
})(SurveyForm);
