import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";

const getAllListings = () => {
  return axios.get(API_URL+"mooring/all")
};


const newListing = (data) =>{
  return axios.post(API_URL+"mooring/newmooring", data, {headers: authHeader(),})
}

const listingService = {
    newListing,
    getAllListings,
};

export default listingService