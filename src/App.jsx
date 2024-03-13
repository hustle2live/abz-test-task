import React from 'react';
import { useSelector } from 'react-redux';

import { Candidates } from './components/GetRequestBlock/Candidates';
import { Header } from './components/HeaderBlock/Header';
import { Register } from './components/PostRequestBlock/RegistrationForm';
import { SuccessMessage } from './components/SuccessSendMessage/SendingMessage';

function App() {
   const successSend = useSelector((state) => state.userReducer.successSend);
   return (
      <>
         <Header />
         <Candidates />
         {!successSend ? <Register /> : <SuccessMessage />}
      </>
   );
}

export default App;
