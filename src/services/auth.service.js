import axios from "axios";
import { API_BASE_URL } from "../constants";

const API_URL = API_BASE_URL+'/auth'

const register = (name, email, password) => {
  console.log(API_BASE_URL + "/signup")
  return axios.post(API_URL + "/signup", {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("ACCESS_TOKEN", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("ACCESS_TOKEN");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
