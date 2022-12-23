import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
  const { data } = await axios.post('auth/login', params); //params stores users email and password
  return data; //if everything is fine, we get info about the user - email and password
});

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params) => {
    const { data } = await axios.post('auth/register', params); //params stores users email and password
    return data; //if everything is fine, we get info about the user - email and password
  }
);

//We need to make application to know if the user is authorized or not. So we need fetchAithMe for that.
export const fetchAuthMe = createAsyncThunk(
  'auth/fetchAuthMe',
  async (params) => {
    const { data } = await axios.get('auth/me', params);
    return data;
  }
);

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state) => {
      state.status = 'loading';
      state.data = null; //initial value is null
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuth.rejected]: (state) => {
      state.status = 'error'; //we get error if something goes wrong;
      state.data = null; //when user logged out, reduced makes the data empty and equal to null.
    },
    [fetchAuthMe.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchAuthMe.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [fetchRegister.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [fetchRegister.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data); // function gets state and checks is the is data in auth

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
