import { CHANGE_SIGN_IN_EMAIL_FIELD } from "./constants.js";

export const setSignInEmailField = email => {
  return {
    type: CHANGE_SIGN_IN_EMAIL_FIELD,
    payload: email
  };
};
