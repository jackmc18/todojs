import { CHANGE_SIGN_IN_EMAIL_FIELD } from "./constants.js";

const initialStateSignIn = {
  signInEmailField: ""
};

export const signIn = (state = initialStateSignIn, action = {}) => {
  switch (action.type) {
    case CHANGE_SIGN_IN_EMAIL_FIELD:
      return Object.assign({}, state, { signInEmailField: action.payload });
    default:
      return state;
  }
};
