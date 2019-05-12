import React from "react";
import { connect } from "react-redux";
import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import * as S from "./styled";

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
    <S.AppLabel to={ROUTES.LANDING}>XO</S.AppLabel>
    <ul>
      {
        currentMatch &&
        <li>
          <S.CurrentMatchLink to={`${ROUTES.MATCH}/${currentMatch}`}>
            Current match
          </S.CurrentMatchLink>
        </li>
      }
      <li>
        <S.StyledLink to={ROUTES.HOME}>
          Home
        </S.StyledLink>
      </li>
      {/*<li>*/}
        {/*<S.StyledLink to={ROUTES.ACTIVITY}>*/}
          {/*Activity*/}
          {/*{*/}
            {/*unreadActivities.length > 0 &&*/}
            {/*`(${unreadActivities.length})`*/}
          {/*}*/}
        {/*</S.StyledLink>*/}
      {/*</li>*/}

      <li>
        < S.StyledLink to={ROUTES.ACCOUNT}>
          {user.username}
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
    <S.AppLabel to={ROUTES.LANDING}>XO</S.AppLabel>
    <ul>
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
