const userAPI = {
   fetchUsers: async (numberOfUsers) =>
      fetch(
         `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${numberOfUsers}`,
      ).then((response) => response),

   fetchToken: async () =>
      fetch(
         'https://frontend-test-assignment-api.abz.agency/api/v1/token',
      ).then((response) => response),

   postUser: async (userData, token) =>
      fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
         method: 'POST',
         body: userData,
         headers: {
            Token: token,
         },
      }).then((response) => response),
};

export { userAPI };
