import { createSlice } from '@reduxjs/toolkit';

import { fetchPositions, fetchUsers, postNewUser } from '../actions/actions.js';

import { increment, initialState, usersStartingLimit } from './initialState.js';

const stateError = (state, action) => {
   state.status = 'rejected';
   state.error = action.payload || 'server error';
};

const stateLoading = (state) => {
   state.status = 'loading';
   state.error = null;
};

const stateFulfilled = (state) => {
   state.status = 'resolved';
   state.error = null;
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

         stateFulfilled(state);
      });

      builder.addCase(postNewUser.fulfilled, (state, action) => {
         state.postData.responseData = action.payload;

         state.successSend = action.payload.success;
         state.usersLimit = usersStartingLimit;

         stateFulfilled(state);
      });

      builder.addCase(fetchPositions.fulfilled, (state, action) => {
         const { positions } = action.payload;
         state.fetchPositions = positions;
         stateFulfilled(state);
      });

      builder.addCase(fetchUsers.pending, (state) => stateLoading(state));
      builder.addCase(postNewUser.pending, (state) => stateLoading(state));
      builder.addCase(fetchPositions.pending, (state) => stateLoading(state));

      builder.addCase(fetchUsers.rejected, (state, action) =>
         stateError(state, action),
      );
      builder.addCase(fetchPositions.rejected, (state, action) =>
         stateError(state, action),
      );

      builder.addCase(postNewUser.rejected, (state, action) => {
         state.postData.responseData = action.payload;
         stateError(state, action);
      });
   },
});

export const { actions, name, reducer } = userReducer;
