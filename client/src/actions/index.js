import axios from 'axios';

import { FETCH_USER } from './types';

// export const fetchUser = () => {
//    return function (dispatch) {
//       axios
//          .get('/api/current_user')
//          .then(res => dispatch({ type: FETCH_USER, payload: res }));
//    };
// };

// export const fetchUser = () => dispatch => {
//    axios
//       .get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
// };

// export const fetchUser = () => dispatch => {
//     await axios.get('/api/current_user')
//       .then(res => dispatch({ type: FETCH_USER, payload: res }));
// };

export const fetchUser = () => async dispatch => {
   const res = await axios.get('/api/current_user');

   dispatch({ type: FETCH_USER, payload: res.data });
};

// export const fetchUser = () => async dispatch => {
//    dispatch({
//       type: FETCH_USER,
//       payload: await axios.get('/api/current_user'),
//    });
// };
