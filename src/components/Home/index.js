import React from "react";
import { compose } from "recompose";
import * as ROUTES from "../../constants/routes";
import * as S from "./styled";
import group from "../../assets/Group.svg";
import user from "../../assets/User.svg";
import { withAuthorization, withEmailVerification } from "../Session";

const HomePage = () => (
  <S.ContentToCenter>
    <S.Card>
      <S.Image src={user} />
      <S.StyledLink to={ROUTES.USERS}>Users</S.StyledLink>
    </S.Card>
    <S.Card>
      <S.Image src={group} />
      <S.StyledLink to={ROUTES.PUBLIC}>Public</S.StyledLink>
    </S.Card>
  </S.ContentToCenter>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
