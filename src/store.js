import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import listingsReducer from "./slices/listings"
const reducer = {
  auth: authReducer,
  message: messageReducer,
  listings: listingsReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
