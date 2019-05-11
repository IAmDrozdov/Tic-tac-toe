import React from 'react';
import { connect } from 'react-redux';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as S from './styled';

const Navigation = ({ authUser, unreadActivities, currentMatch }) =>
  authUser ? (
    <NavigationAuth user={authUser}
                    unreadActivities={unreadActivities}
                    currentMatch={currentMatch} />
  ) : (
    <NavigationNonAuth />
  );

const NavigationAuth = ({ user, unreadActivities, currentMatch }) => (
  <S.NavBar>
    <S.AppLabel>XO</S.AppLabel>
    <ul>
      <li>
        <S.StyledLink to={ROUTES.LANDING}>
          Landing
        </S.StyledLink>
      </li>
      <li>
        <S.StyledLink to={ROUTES.HOME}>
          Home
        </S.StyledLink>
      </li>
      <li>
        <S.StyledLink to={ROUTES.ACTIVITY}>
          Activity
          {
            unreadActivities.length > 0 &&
            `(${unreadActivities.length})`
          }
        </S.StyledLink>
      </li>
      {
        currentMatch &&
        <li>
          <S.StyledLink to={`${ROUTES.MATCH}/${currentMatch}`}>
            Current match
          </S.StyledLink>
        </li>
      }
      <li>
        < S.StyledLink to={ROUTES.ACCOUNT}>
          {user.username}
          {
            user.online &&
            '(online)'
          }
        </S.StyledLink>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </S.NavBar>
);

const NavigationNonAuth = () => (
  <S.NavBar>
    <S.AppLabel>XO</S.AppLabel>
    <ul>
      <li>
        <S.StyledLink to={ROUTES.LANDING}>
          Landing
        </S.StyledLink>
      </li>
      <li
      ><S.StyledLink to={ROUTES.SIGN_IN}>
        Sign In
      </S.StyledLink>
      </li>
      <li>
        <S.StyledLink to={ROUTES.SIGN_UP}>
          Sign Up
        </S.StyledLink>
      </li>
    </ul>
  </S.NavBar>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  currentMatch: state.sessionState.currentMatch,
  unreadActivities: state.activityState.unread
});

export default connect(mapStateToProps)(Navigation);
