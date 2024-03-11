import { configureStore } from '@reduxjs/toolkit';

import { reducer as userReducer } from './userReducer/user.slice.js';

export default configureStore({
   reducer: { userReducer },
});
