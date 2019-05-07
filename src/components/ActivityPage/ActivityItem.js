import React from 'react';
import TrackVisibility from 'react-on-screen';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const ActivityItem = (props) => {
  const { activity, respond, respondPublic, isVisible, whenVisible } = props;

  if (isVisible && !activity.viewed) whenVisible(activity.id);

  switch (activity.type) {
    case 'request':
      return (
        (
          <li>
            <span style={{
              fontWeight: !activity.viewed && 'bold'
            }}>{`${activity.name} want to play with  you`}</span>
            <input type="button" value='decline'
                   onClick={(e) => respond(e, activity)} />
            <input type="button" value='accept'
                   onClick={(e) => respond(e, activity)} />
          </li>
        )
      );
    case 'p-request':
      return (
        (
          <li>
            <span style={{
              fontWeight: !activity.viewed && 'bold'
            }}>{`${activity.name} want to play with  you`}</span>
            <input type="button" value='decline'
                   onClick={(e) => respondPublic(e, activity)} />
            <input type="button" value='accept'
                   onClick={(e) => respondPublic(e, activity)} />
          </li>
        )
      );
    case 'response':
      return (
        <li>
          <span style={{
            fontWeight: !activity.viewed && 'bold'
          }}>{activity.message}</span>
        </li>
      );
    case 'match':
      return (
        <li>
          <span style={{
            fontWeight: !activity.viewed && 'bold'
          }}>{activity.message}</span>
          <Link to={`${ROUTES.MATCH}/${activity.matchId}`}>Go to match
            with {activity.name}</Link>
        </li>
      );
    default:
      return (
        <li>
          <span style={{
            fontWeight: !activity.viewed && 'bold'
          }}>{activity.message} {'other'}</span>
        </li>
      );
  }
};

const ActivityItemTracked = (props) => (
  <TrackVisibility once>
    <ActivityItem {...props} />
  </TrackVisibility>
);
export default ActivityItemTracked;