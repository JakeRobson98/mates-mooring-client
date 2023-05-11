import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const getAllBookings = () => {
  return axios.get(API_URL+"booking/all")
};


const newBooking = (data) =>{
  return axios.post(API_URL+"booking/newBooking", data, {headers: authHeader(),})
}

const bookingService = {
    newBooking,
    getAllBookings,
};

export default bookingService