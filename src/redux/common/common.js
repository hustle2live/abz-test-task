const ActionTypes = {
   GET_USERS: 'users/fetchUsers',
   POST_USER: 'users/userRegister',
};

const ErrorTypes = {
   GET_TOKEN_ERROR: 'Error while getting a token. Fetch Error',
   GET_USERS_ERROR: 'Error while getting a list of Users',
   POST_USER_ERROR: 'Error. User registration failed.',
   FORM_DATA_ERROR: 'Error. FormData or token is not valid.',
   UNKNOWN_ERROR: 'Something went wrong',
};

export { ActionTypes, ErrorTypes };
