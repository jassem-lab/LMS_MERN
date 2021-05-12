import axios from 'axios';
import { CLEAR_ERRORS, GET_ERRORS } from '../actionTypes';
import { isEmpty } from '../utils';

const registerUser = (userData, profileData, history) => (dispatch) => {
  // return new Promise((resolve, reject) => {
  //   axios
  //     .post('/api/account/add-account', userData)
  //     .then(res => {
  //       axios
  //         .post('/api/profile/add', profileData)
  //         .then(res => {
  //           dispatch({ type: CLEAR_ERRORS, payload: {} });
  //           history.push('/dashboard')
  //           .resolve(true)
  //         })
  //         .catch(err => {
  //           dispatch({ type: GET_ERRORS, payload: err.response.data });
  //           reject(false);
  //         });
  //     })
  //     .catch(err => {
  //       if (!isEmpty(err.response)) {
  //         dispatch({ type: GET_ERRORS, payload: err.response.data });
  //         reject(false);
  //       }
  //     });
  // });
  console.log(userData, profileData)
  return new Promise((resolve,reject)=>{
    axios
    .all([
      axios.post('/api/account/add-account', userData),
      axios.post('/api/profile/add', profileData),
    ])
    .then(
      axios.spread((userData, profileData) => {
        console.log('userData', userData, 'profileData', profileData);
        dispatch({ type: CLEAR_ERRORS, payload: {} });
        resolve(true)
        
      })
      
    )
    .catch(err=>{
      if(!isEmpty(err.response)){
        dispatch({type : GET_ERRORS, payload : err.response.data})
        reject(false)
      }
      console.log(err.response)
    })
    ;})
};

export default registerUser;
