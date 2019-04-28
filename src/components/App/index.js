import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import ActivityPage from '../ActivityPage';
import PublicPage from '../Public';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { UserList } from '../Users';
import UserItem from '../Users/UserItem';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={ROUTES.USERS} component={UserList} />
      <Route exact path={ROUTES.USERS_DETAIL} component={UserItem} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ACTIVITY} component={ActivityPage} />
      <Route path={ROUTES.PUBLIC} component={PublicPage} />
    </div>
  </Router>
);

export default withAuthentication(App);
