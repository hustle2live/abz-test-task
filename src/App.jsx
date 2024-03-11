import React from 'react';
import { useSelector } from 'react-redux';

import { Candidates } from './components/Candidates/Candidates';
import { Header } from './components/Header/Header';
import { Register } from './components/Registration/RegistrationForm';
import { SuccessMessage } from './components/SendMessage/SendingMessage';

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
