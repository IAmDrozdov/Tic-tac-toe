import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = ({ authUser }) =>
  authUser ? (
    <NavigationAuth user={authUser} />
  ) : (
    <NavigationNonAuth />
  );

const NavigationAuth = ({ user }) => {
  const activityCounter = 0;
  // firebase.user(user.uid)
  //   .collection('activity')
  //   .onSnapshot(snapshot => {activityCounter = snapshot.size;});

  return (
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ACTIVITY}>Activity {activityCounter > 0 &&
        `(${activityCounter})`}</Link>
      </li>
      {user.match &&
      <li>
        <Link to={`${ROUTES.MATCH}/${user.match}`}>Current match</Link>
      </li>}
      <li>
        {user.username} {user.online && '(online)'}
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  );

};

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>

    <li>
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </li>
  </ul>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

export default connect(mapStateToProps)(Navigation);
