import { createAsyncThunk } from '@reduxjs/toolkit';

import { ActionTypes, ErrorTypes } from '../common/common.js';

import { userAPI } from './userAPI.js';

const fetchUsers = createAsyncThunk(
   ActionTypes.GET_USERS,

   async (_, { getState, rejectWithValue }) => {
      const {
         userReducer: { usersLimit },
      } = getState();

      try {
         const response = await fetch(userAPI.fetchUsers + usersLimit);
         if (!response.ok) rejectWithValue(ErrorTypes.GET_USERS_ERROR);

         const data = await response.json();

         if (data.users && data.total_users) {
            return { users: data.users, total_users: data.total_users };
         }

         return rejectWithValue(ErrorTypes.UNKNOWN_ERROR);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

const postNewUser = createAsyncThunk(
   ActionTypes.POST_USER,

   async function (formData, { rejectWithValue }) {
      if (!formData) rejectWithValue(ErrorTypes.FORM_DATA_ERROR);

      try {
         const getTokenResponse = await fetch(userAPI.fetchToken);
         if (!getTokenResponse.ok) throw new Error(ErrorTypes.GET_TOKEN_ERROR);

         const tokenData = await getTokenResponse.json();

         const postUserResponse = await fetch(userAPI.postUser, {
            method: 'POST',
            body: formData,
            headers: {
               Token: tokenData.token,
            },
         });

         if (!postUserResponse.ok) {
            const responseErrorData = await postUserResponse.json();
            const errorMessage = responseErrorData.message;
            throw new Error(errorMessage || ErrorTypes.POST_USER_ERROR);
         }

         const data = await postUserResponse.json();
         return data;
      } catch (error) {
         return rejectWithValue(error?.message ?? ErrorTypes.UNKNOWN_ERROR);
      }
   },
);

const fetchPositions = createAsyncThunk(
   ActionTypes.GET_POSITIONS,

   async (_, { rejectWithValue }) => {
      try {
         const response = await fetch(userAPI.fetchPositions);
         if (!response.ok) rejectWithValue(ErrorTypes.GET_POSITION_ERROR);

         const data = await response.json();
         const positions = data.positions;

         if (!positions) rejectWithValue(ErrorTypes.GET_POSITION_ERROR);

         return { positions: positions };
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export { fetchUsers, postNewUser, fetchPositions };
