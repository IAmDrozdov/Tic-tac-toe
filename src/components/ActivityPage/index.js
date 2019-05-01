import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import ActivityItemTracked from './ActivityItem';

import { withAuthorization, withEmailVerification } from '../Session';

class ActivityPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
      activityListener: null,
      viewedActivities: []
    };
  }

  componentDidMount() {
    const activityListener = this.props.firebase.activity(
      this.props.authUser.uid)
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
    const batch = this.props.firebase.db.batch();
    for (let i = 0; i < this.state.viewedActivities.length; i = i + 1) {
      const activityRef = this.props.firebase.activity(this.props.authUser.uid)
        .doc(this.state.viewedActivities[i]);
      batch.update(activityRef, { viewed: true });
    }
    batch.commit();
    this.state.activityListener && this.state.activityListener();
  }

  respond = (e, activity) => {
    const hisActivityRef = this.props.firebase.activity(activity.uid);
    const myActivityRef = this.props.firebase.activity(
      this.props.authUser.uid);
    const responseRef = hisActivityRef.doc();
    const response = {
      viewed: false,
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
    const hisActivityRef = this.props.firebase.activity(activity.uid);
    const myActivityRef = this.props.firebase.activity(
      this.props.authUser.uid);
    const responseRef = hisActivityRef.doc();
    const response = {
      viewed: false,
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

  whenVisible = (id) => {
    this.setState(
      prevState => ({ viewedActivities: [...prevState.viewedActivities, id] }));
  };

  render = () => {
    const { activities, loading } = this.state;
    return (
      <div>
        <h1>Activities</h1>
        {loading && <div>Loading ...</div>}
        <ul>
          {
            activities.map(a => (
              <ActivityItemTracked key={a.id}
                                   activity={a}
                                   respond={this.respond}
                                   respondPublic={this.respondPublic}
                                   whenVisible={this.whenVisible}
              />
            ))
          }
        </ul>
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
