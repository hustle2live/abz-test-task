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
         const response = await userAPI.fetchUsers(usersLimit);
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
      try {
         const getTokenResponse = await userAPI.fetchToken();
         if (!getTokenResponse.ok) throw new Error(ErrorTypes.GET_TOKEN_ERROR);

         const tokenData = await getTokenResponse.json();

         const { token } = tokenData;

         if (formData && token) {
            const postUserResponse = await userAPI.postUser(formData, token);

            if (!postUserResponse.ok) {
               const respData = await postUserResponse.json();
               throw new Error(respData?.message ?? ErrorTypes.POST_USER_ERROR);
            }

            const data = await postUserResponse.json();
            return data;
         }

         rejectWithValue(ErrorTypes.FORM_DATA_ERROR);
      } catch (error) {
         return rejectWithValue(error?.message || ErrorTypes.UNKNOWN_ERROR);
      }
   },
);

const fetchPositions = createAsyncThunk(
   ActionTypes.GET_POSITIONS,

   async (_, { rejectWithValue, dispatch }) => {
      try {
         const response = await userAPI.fetchPositions();
         if (!response.ok) rejectWithValue(ErrorTypes.GET_POSITION_ERROR);

         const data = await response.json();

         if (data ?? data.positions) {
            return { positions: data.positions };
         }

         return rejectWithValue(ErrorTypes.UNKNOWN_ERROR);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export { fetchUsers, postNewUser, fetchPositions };
