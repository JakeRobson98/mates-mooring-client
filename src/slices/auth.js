import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AuthService from "../services/auth.service";

const ACCESS_TOKEN = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
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

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { token: data };
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

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = ACCESS_TOKEN
  ? { authenticated: true, ACCESS_TOKEN }
  : { authenticated: false, ACCESS_TOKEN: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.authenticated = false;
    },
    [register.rejected]: (state, action) => {
      state.authenticated = false;
    },
    [login.fulfilled]: (state, action) => {
      state.authenticated = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.authenticated = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.authenticated = false;
      state.user = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
