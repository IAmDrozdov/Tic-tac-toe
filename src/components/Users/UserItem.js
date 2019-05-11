import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { DEFAULT_AVATAR } from "../../constants/user";

const UserItem = (props) => (
  <li>
    <Link to={`${ROUTES.USERS}/${props.user.uid}`}>
      <img style={{ height: "100px", width: "100px" }}
           src={props.user.avatarUrl ? props.user.avatarUrl : DEFAULT_AVATAR}
           alt="" />
      <strong>{props.user.username}</strong>
      <strong>{props.user.online && "(online)"}</strong>
    </Link>
  </li>
);

export default UserItem;