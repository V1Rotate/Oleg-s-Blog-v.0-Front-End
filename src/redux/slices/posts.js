import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data; //we fetching posts here and getting what we get from backend;
});

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    //we describe the conditions (pending or fullfilled or rejected) of our async action here
    [fetchPosts.pending]: (state) => {
      state.posts.items = [];
      //function fetchPosts.pending has argument 'state'
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      //there is a secon argument here
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      //there is a secon argument here
      state.posts.items = [];
      state.posts.status = 'error';
    },
    //----------------we do the same for tags as well:
    [fetchTags.pending]: (state) => {
      state.tags.items = [];
      //function fetchPosts.pending has argument 'state'
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      //there is a secon argument here
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      //there is a secon argument here
      state.tags.items = [];
      state.tags.status = 'error';
    },
  },
});

export const postsReducer = postsSlice.reducer;
