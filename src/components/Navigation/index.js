import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = ({ authUser, unreadActivities, currentMatch }) =>
  authUser ? (
    <NavigationAuth user={authUser}
                    unreadActivities={unreadActivities}
                    currentMatch={currentMatch} />
  ) : (
    <NavigationNonAuth />
  );

const NavigationAuth = ({ user, unreadActivities, currentMatch }) => {
  return (
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACTIVITY}>Activity {unreadActivities.length > 0 &&
        `(${unreadActivities.length})`}</Link>
      </li>
      {currentMatch &&
      <li>
        <Link to={`${ROUTES.MATCH}/${currentMatch}`}>Current match</Link>
      </li>}
      <li>
        <Link to={ROUTES.ACCOUNT}>{user.username} {user.online &&
        '(online)'}</Link>
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
  authUser: state.sessionState.authUser,
  currentMatch: state.sessionState.currentMatch,
  unreadActivities: state.activityState.unread
});

export default connect(mapStateToProps)(Navigation);
