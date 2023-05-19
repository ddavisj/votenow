import { FETCH_SURVEYS, DELETE_SURVEY } from '../actions/types';
// import _ from 'lodash';

function surveysReducer(state = [], action) {
   switch (action.type) {
      case FETCH_SURVEYS:
         return action.payload;
      case DELETE_SURVEY:
         // return [];
         return {
            ...state,
            surveys: state.surveys.filter(
               survey => survey._id !== action.payload
            ),
         };
      // return state.filter(survey => survey._id !== action.payload);
      // return action.payload;
      // return _.omit(state, action.payload);
      default:
         return state;
   }
}

export default surveysReducer;
