import { fetchPositions, fetchUsers, postNewUser } from '../actions/actions.js';

import { actions } from './user.slice.js';

const allActions = {
   ...actions,
   fetchPositions,
   fetchUsers,
   postNewUser,
};

export { allActions as actions };
export { reducer } from './user.slice.js';
