import React from 'react';

import '@material/web/progress/circular-progress.js';

import global from '../../styles/styles.module.scss';

const LoadingElement = () => (
   <div className={global.loadingElement}>
      <md-circular-progress
         className={global.loadingElement}
         value="0.5"
         indeterminate
         aria-label="Page loading progress"
      ></md-circular-progress>
   </div>
);

export { LoadingElement };
