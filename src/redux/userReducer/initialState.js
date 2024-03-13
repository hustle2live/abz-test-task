import { increment, usersStartingLimit } from '../common/constants.js';

const initialState = {
   usersArray: [],
   status: 'loading',
   error: '',
   usersLimit: usersStartingLimit,
   fetchData: null,
   postData: {
      tokenData: null,
      responseData: null,
   },
   fetchPositions: null,
   successSend: false,
};

export { increment, initialState, usersStartingLimit };
