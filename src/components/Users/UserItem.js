import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const UserItem = (props) => (
  <li>
    <Link to={`${ROUTES.USERS}/${props.user.uid}`}>
      <strong>{props.user.username}</strong>
      <strong>{props.user.online && '(online)'}</strong>
    </Link>
    <input type="button" onClick={() => props.askMatch(props.user)}
           value="Ask match" />
  </li>
);

export default UserItem;