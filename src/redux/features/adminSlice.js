// adminSlice.js
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearMessage } from './AuthSlice'; // Assuming you have a clearMessage action in AuthSlice

const initialState = {
  loading: false,
  error: null,
  success: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    adminLoginRequest(state) {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    adminLoginSuccess(state, action) {
      state.loading = false;
      state.success = action.payload;
    },
    adminLoginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { adminLoginRequest, adminLoginSuccess, adminLoginFailure } = adminSlice.actions;

export const adminLogin = (email,password) => async (dispatch) => {
  dispatch(adminLoginRequest());
  try {
    // Perform admin login API call
    const response = await axios.post('/admin/login', {email, password }); // Assuming your admin login API is at '/admin/login'
    dispatch(adminLoginSuccess(response.data));
    dispatch(clearMessage()); // Clear any previous error/success messages
  } catch (error) {
    dispatch(adminLoginFailure(error.response.data.message));
  }
};

export default adminSlice.reducer;
