import { LOGIN_USER, LOGOUT_USER } from "../Actions/Login";
import { isloggedinService } from "../Services/LoginService";

const LogInReducer = (
  state = isloggedinService()
    ? { logedIn: true, user: JSON.parse(localStorage.getItem("LoggedIn")) }
    : { logedIn: false, user: {} },
  action
) => {
  switch (action.type) {
    case LOGOUT_USER:
      return { logedIn: false, user: {} };
    case LOGIN_USER:
      return { logedIn: true, user: action.loginInfo };
    default:
      return state;
  }
};
export default LogInReducer;
