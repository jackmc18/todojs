import {
  REQUEST_SIGNIN_PENDING,
  REQUEST_SIGNIN_SUCCESS,
  REQUEST_SIGNIN_FAILED,
  CHANGE_SIGNIN_EMAIL_FIELD
} from './constants'

export const setSignInEmailField = (text) => {
  return {
    type: CHANGE_SIGNIN_EMAIL_FIELD,
    payload: text
  }
}

export const requestSignIn = () => (dispatch) => {
  dispatch({ type: REQUEST_SIGNIN_PENDING });
  fetch('http://localhost:3000/signin', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: this.state.signInEmail,
      password: this.state.signInPassword
    })
  })
    .then(response => console.log(response.json()))
}