import axios from "axios";

export const API_URL =
  process.env.REACT_APP_API_SARK || "http://127.0.0.1:5000/api";

const SIGNUP_URL = `${API_URL}/register`;

export const SignUpService = async (signup) => {
  const info = await axios.post(SIGNUP_URL, signup);
  return info.data;
};
