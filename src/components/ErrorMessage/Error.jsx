import React from 'react';

import global from '../../styles/styles.module.scss';

const ErrorMessage = (props) => {
   const errorMessage = props.error;

   return (
      <div className={global.errorMessage}>
         <p> An error occured : {errorMessage}</p>
      </div>
   );
};

export { ErrorMessage };
