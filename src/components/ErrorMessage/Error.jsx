import React from 'react';

import global from '../../styles/styles.module.scss';

const ErrorMessage = (props) => (
   <div className={global.errorMessage}>
      <p> An error occured : {props.error}</p>
   </div>
);

export { ErrorMessage };
