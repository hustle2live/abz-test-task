import { fetchUsers, postNewUser } from '../actions/actions.js';

import { actions } from './user.slice.js';

const allActions = {
   ...actions,
   fetchUsers,
   postNewUser,
};

export { allActions as actions };
export { reducer } from './user.slice.js';
