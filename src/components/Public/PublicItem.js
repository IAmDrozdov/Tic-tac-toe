import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const PublicItem = (props) => (
  <li>
    {
      props.match.uid !== props.uid ?
        <Link
          to={`${ROUTES.USERS}/${props.match.uid}`}>{props.match.name}</Link>
        :
        'your request'
    }

    {props.match.uid !== props.uid &&
    <input type="button" value='respond'
           onClick={() => {
             return props.respond(props.match);
           }} />
    }
  </li>
);

export default PublicItem;