import React from "react";
import * as ROUTES from "../../constants/routes";
import { DEFAULT_AVATAR } from "../../constants/user";
import * as S from "./styled";

const UserItem = (props) => (
  <S.ListItem to={`${ROUTES.USERS}/${props.user.uid}`}>

    <S.ImageContainer>
      <S.Image style={{ height: "100px", width: "100px" }}
               src={props.user.avatarUrl ? props.user.avatarUrl : DEFAULT_AVATAR}
               alt="" >
      </S.Image>
      {props.user.online && <S.OnlineBadge />}
    </S.ImageContainer>

    <S.Text>
      {props.user.username}
    </S.Text>
  </S.ListItem>
);

export default UserItem;