import axios from "axios";

const API_URL = process.env.BACKEND_API || "http://127.0.0.1:5000/api";

const LOGIN_URL = `${API_URL}/login`;

export const loginService = async (login) => {
  const loginInfo = await axios.post(LOGIN_URL, login);
  if (loginInfo.data.success) {
    localStorage.setItem("LoggedIn", JSON.stringify(loginInfo.data.userData));
  }
  return loginInfo.data;
};

export const isloggedinService = () => {
  return localStorage.getItem("LoginToken") !== null;
};

export const logOutService = () => {
  localStorage.removeItem("LoggedIn");
};
