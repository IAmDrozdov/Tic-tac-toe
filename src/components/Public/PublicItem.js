import React from "react";
import * as ROUTES from "../../constants/routes";
import * as S from "./styled";

const PublicItem = (props) => (
  <S.ItemInfoContainer>
    {
      props.match.uid !== props.uid ?
        <S.StyledLink
          to={`${ROUTES.USERS}/${props.match.uid}`}>
          {props.match.name}
        </S.StyledLink>
        :
        "your request"
    }

    {props.match.uid !== props.uid &&
    <S.RespondButton
      onClick={() => props.respond(props.match)}>
      respond
    </S.RespondButton>
    }
  </S.ItemInfoContainer>
);

export default PublicItem;