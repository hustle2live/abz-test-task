import React from 'react';
import { useSelector } from 'react-redux';

import { Candidates } from './components/GetRequestBlock/Candidates';
import { Header } from './components/HeaderBlock/Header';
import { Register } from './components/PostRequestBlock/RegistrationForm';
import { SuccessMessage } from './components/SuccessSendMessage/SendingMessage';

function App() {
   const successSend = useSelector(
      ({ userReducer }) => userReducer.successSend,
   );

   return (
      <>
         <Header />
         <Candidates />
         {successSend ? <SuccessMessage /> : <Register />}
      </>
   );
}

export default App;
