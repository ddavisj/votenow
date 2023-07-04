// SurveyNew shows SurveyForm and SurveyFormReview
import { useState } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

const SurveyNew = () => {
   const [state, setState] = useState({ showFormReview: false });

   const renderContent = () => {
      if (state.showFormReview) {
         return (
            <SurveyFormReview
               onCancel={() => {
                  setState({ showFormReview: false });
               }}
            />
         );
      }

      return (
         <SurveyForm
            onSurveySubmit={() => {
               setState({ showFormReview: true });
            }}
         />
      );
   };

   return <div>{renderContent()}</div>;
};

export default reduxForm({
   form: 'surveyForm',
})(SurveyNew);
