import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const getPublicContent = () => {
  return axios.get(API_URL);
};

const getUserBoard = () => {
  return axios.get(API_URL + "user/me", { headers: authHeader() });
};

const userService = {
  getPublicContent,
  getUserBoard,
};

export default userService