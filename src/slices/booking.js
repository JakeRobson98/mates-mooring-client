import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import BookingService from '../services/booking.service'


export const newBooking = createAsyncThunk(
  "bookings/newBooking",
  async (data, thunkAPI) => {
    try {
      console.log(data)
        const response = await BookingService.newBooking(data)
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



const initialState ={
    loading : false,
}

const bookingsSlice = createSlice({
    name: "bookings",
    initialState,
    extraReducers: {
      [newBooking.fulfilled]: (state, action) => {
        state.loading = false
    },
      [newBooking.rejected]: (state, action) => {
        state.loading = false
      },
      [newBooking.pending]:(state, action) =>{
        state.loading = true
      }
    },
  });

const { reducer } = bookingsSlice;
export default reducer;
