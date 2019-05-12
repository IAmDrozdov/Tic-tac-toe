import React from 'react';

import { withFirebase } from '../Firebase';
import * as S from './styled';

const SignOutButton = ({ firebase }) => (
  <S.Link onClick={firebase.doSignOut}>
    Sign Out
  </S.Link>
);

export default withFirebase(SignOutButton);
