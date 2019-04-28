import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';

class ActivityPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
      activityListener: null
    };
  }

  componentDidMount() {
    const activityListener = this.props.firebase.user(this.props.authUser.uid)
      .collection('activity')
      .orderBy('date', 'asc')
      .onSnapshot(snapshot => {
        const activities = this.state.activities.slice();

        snapshot.docChanges().forEach(change => {
          const data = change.doc.data();
          if (change.type === 'added') {
            activities.unshift(data);
          } else if (change.type === 'modified') {
            const idx = this.state.activities.map(a => a.id).indexOf(data.id);
            activities[idx] = data;
          } else if (change.type === 'removed') {
            const idx = this.state.activities.map(a => a.id).indexOf(data.id);
            activities.splice(idx, 1);
          }
        });
        this.setState({ activities });

      });
    this.setState({ activityListener });
  }

  componentWillUnmount() {
    this.state.activityListener && this.state.activityListener();
  }

  respond = (e, activity) => {
    const hisActivityRef = this.props.firebase.user(activity.uid)
      .collection('activity');
    const myActivityRef = this.props.firebase.user(
      this.props.authUser.uid)
      .collection('activity');
    const responseRef = hisActivityRef.doc();
    const response = {
      date: new Date(),
      id: responseRef.id,
      type: 'response',
      message: e.target.value === 'decline'
        ? `${this.props.authUser.username} declined your request`
        : `${this.props.authUser.username} approved your request`
    };
    responseRef.set(response);
    myActivityRef.doc(activity.id).delete();
    hisActivityRef.doc(activity.bindedActivity).delete();
  };

  respondPublic = (e, activity) => {
    const hisActivityRef = this.props.firebase.user(activity.uid)
      .collection('activity');
    const myActivityRef = this.props.firebase.user(
      this.props.authUser.uid)
      .collection('activity');
    const responseRef = hisActivityRef.doc();
    const response = {
      date: new Date(),
      id: responseRef.id,
      type: 'response',
      message: e.target.value === 'decline'
        ? `${this.props.authUser.username} declined your request`
        : `${this.props.authUser.username} accepted your request`
    };
    responseRef.set(response);
    myActivityRef.doc(activity.id).delete();
    hisActivityRef.doc(activity.bindedActivity).delete();
    if (e.target.value === 'accept') {
      this.props.firebase.db.collection('public')
        .doc(activity.publicRef)
        .delete();
    }
  };

  render = () => {
    const { activities, loading } = this.state;
    return (
      <div>
        <h1>Activities</h1>
        {loading && <div>Loading ...</div>}
        {
          activities.map(a => {
            switch (a.type) {
              case 'request':
                return (
                  (
                    <li key={a.id}>
                      {`${a.name} want to play with  you`}
                      <input type="button" value='decline'
                             onClick={(e) => {
                               return this.respond(e, a);
                             }} />
                      <input type="button" value='accept'
                             onClick={(e) => this.respond(e, a)} />
                    </li>
                  )
                );
              case 'p-request':
                return (
                  (
                    <li key={a.id}>
                      {`${a.name} want to play with  you`}
                      <input type="button" value='decline'
                             onClick={(e) => {
                               return this.respondPublic(e, a);
                             }} />
                      <input type="button" value='accept'
                             onClick={(e) => this.respondPublic(e, a)} />
                    </li>
                  )
                );
              case 'response':
                return (
                  <li key={a.id}>
                    {a.message}
                  </li>
                );
              default:
                return (
                  <li key={a.id}>
                    {a.message} {'other'}
                  </li>
                );
            }
          })
        }
      </div>
    );
  };
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  connect(mapStateToProps)
)(ActivityPage);
