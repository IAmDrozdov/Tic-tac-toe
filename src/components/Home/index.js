import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

import { withAuthorization, withEmailVerification } from '../Session';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    <Link to={ROUTES.USERS}>Users</Link>
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
