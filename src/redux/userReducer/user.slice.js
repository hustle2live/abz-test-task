import { createSlice } from '@reduxjs/toolkit';

import { fetchPositions, fetchUsers, postNewUser } from '../actions/actions.js';

import { increment, initialState, usersStartingLimit } from './initialState.js';

const stateLoading = (state) => {
   state.status = 'loading';
};

export const userReducer = createSlice({
   initialState: initialState,
   name: 'users',
   reducers: {
      increaseUsersLimit: (state) => {
         state.usersLimit = state.usersLimit + increment;
      },
      resetUsersLimit: (state) => {
         state.usersLimit = usersStartingLimit;
      },
   },

   extraReducers: (builder) => {
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
         const { users, total_users } = action.payload;
         state.usersArray = users;
         state.usersTotal = total_users;

         state.status = 'resolved';
         state.errors.fetchUsersError = '';
      });

      builder.addCase(postNewUser.fulfilled, (state, action) => {
         state.postData.responseData = action.payload;
         state.successSend = action.payload.success;
         state.usersLimit = usersStartingLimit;

         state.status = 'resolved';
         state.errors.postNewUserError = '';
      });

      builder.addCase(fetchPositions.fulfilled, (state, action) => {
         const { positions } = action.payload;
         state.fetchPositions = positions;

         state.status = 'resolved';
         state.errors.fetchPositionsError = '';
      });

      builder.addCase(fetchUsers.pending, (state) => stateLoading(state));
      builder.addCase(postNewUser.pending, (state) => stateLoading(state));
      builder.addCase(fetchPositions.pending, (state) => stateLoading(state));

      builder.addCase(fetchUsers.rejected, (state, action) => {
         state.status = 'rejected';
         state.errors.fetchUsersError = action.payload;
      });

      builder.addCase(fetchPositions.rejected, (state, action) => {
         state.status = 'rejected';
         state.errors.fetchPositionsError = action.payload;
      });

      builder.addCase(postNewUser.rejected, (state, action) => {
         state.status = 'rejected';
         state.errors.postNewUserError = action.payload;
      });
   },
});

export const { actions, name, reducer } = userReducer;
