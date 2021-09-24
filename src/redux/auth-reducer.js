const SET_LOGIN = "__catalog/auth/SET_LOGIN";
const SET_USER_EMAIL = "__catalog/auth/SET_USER_EMAIL";
const SET_INITIALIZED = "__catalog/auth/SET_INITIALIZED";

let initialState = {
  login: "",
  userEmail: "",
  initialized: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        login: action.login,
        password: action.password,
      };

    case SET_USER_EMAIL:
      return {
        ...state,
        userEmail: action.userEmail,
      };

      case SET_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

export const setLogin = (login, password) => {
  console.log("dispatch" + login);
  return {
    type: SET_LOGIN,
    login,
    password,
  };
};

export const setUserEmail = (userEmail) => ({
  type: SET_USER_EMAIL,
  userEmail,
});

export const initializedSuccss = () => {
  return { type: SET_INITIALIZED };
};

export default authReducer;
