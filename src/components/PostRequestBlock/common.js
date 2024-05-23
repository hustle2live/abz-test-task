import * as helpers from '../../features/helpers.js';
import { ErrorMessage } from '../ErrorMessage/Error.jsx';
import { fetchPositions, postNewUser } from '../../redux/actions/actions.js';
import global from '../../styles/styles.module.scss';

import { textFieldValidation } from './textFieldValidation.js';

import styles from './RegistrationForm.module.scss';

export {
   ErrorMessage,
   fetchPositions,
   global,
   helpers,
   postNewUser,
   styles,
   textFieldValidation,
};
