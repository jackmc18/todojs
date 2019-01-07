import {
  REQUEST_SIGNIN_PENDING,
  REQUEST_SIGNIN_SUCCESS,
  REQUEST_SIGNIN_FAILED,
  CHANGE_SIGNIN_EMAIL_FIELD
} from './constants'


const initialStateSignIn = {
  isSignInPending: false,
  user: {
    signInEmail: '',
    signInPassword: ''
  },
  error: ''
}

export const signIn = (state = initialStateSignIn, action = {}) => {
  switch (action.type) {
    case CHANGE_SIGNIN_EMAIL_FIELD:
      return Object.assign({}, state, { signInEmail: action.payload })
    default:
      return state;
  }
}

export const requestSignIn = (state = initialStateSignIn, action = {}) => {
  switch (action.type) {
    case REQUEST_SIGNIN_PENDING:
      return Object.assign({}, state, { isSignInPending: true });
    case REQUEST_SIGNIN_SUCCESS:
      return Object.assign({}, state, { isSignInPending: false });
    case REQUEST_SIGNIN_FAILED:
      return Object.assign({}, state, { error: action.payload, isPending: false });
    default:
      return state;
  }
}