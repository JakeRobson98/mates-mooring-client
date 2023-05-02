import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ListingService from '../services/listing.service'

const isSea = require('is-sea');
//import * as isSea from 'is-sea';

export const getAllListings = createAsyncThunk(
    "listings/getListings",
    async (thunkAPI) => {
      try {
        const response = await ListingService.getAllListings()
        return response;
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
      }
    }
);

export const newListing = createAsyncThunk(
  "listings/newListing",
  async (data, thunkAPI) => {
    try {
      console.log(data)
      if(data.inWater){
        const response = await ListingService.newListing(data)
        return response;
      }else{
        throw new Error("Please pick a location in the ocean")
      }
    
    } catch (error) {
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
    }
  }
);

const initialState ={
    listings : [],
    loading : false,
}

const listingsSlice = createSlice({
    name: "listings",
    initialState,
    extraReducers: {
      [getAllListings.fulfilled]: (state, action) => {
        state.listings = action.payload.data;
      },
      [getAllListings.rejected]: (state, action) => {
        state.listings = [];
      },
    },
  });

const { reducer } = listingsSlice;
export default reducer;
