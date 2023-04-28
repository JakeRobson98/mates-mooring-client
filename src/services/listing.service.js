import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const getAllListings = () => {
  return axios.get(API_URL+"mooring/all")
};

const listingService = {
    getAllListings,
};

export default listingService