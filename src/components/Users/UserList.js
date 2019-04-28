import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    if (!this.props.users.length) {
      this.setState({ loading: true });
    }
    this.props.firebase
      .users()
      .get()
      .then(snapshot => {
        const users = {};
        snapshot.forEach(doc => {
          const data = doc.data();
          users[data.uid] = data;
        });
        return users;
      })
      .then((users) => {
        this.props.onSetUsers(users);
        this.setState({ loading: false });
      });
  }

  askMatch = async (user) => {
    const hisActivityRef = this.props.firebase.user(user.uid)
      .collection('activity');
    const myActivityRef = this.props.firebase.user(this.props.authUser.uid)
      .collection('activity');
    const snapshot = await hisActivityRef.get();
    let meIn = false;
    snapshot.forEach(doc => {
      if (doc.data().uid ===
        this.props.authUser.uid) meIn = true;
    });
    if (!meIn) {
      const newActivityRef = myActivityRef.doc();
      newActivityRef.set({
        date: new Date(),
        uid: this.props.authUser.uid,
        id: newActivityRef.id,
        message: `Your request to ${user.username} is pending`
      });
      const requestRef = hisActivityRef.doc();
      requestRef.set({
        date: new Date(),
        uid: this.props.authUser.uid,
        name: this.props.authUser.username,
        type: 'request',
        id: requestRef.id,
        bindedActivity: newActivityRef.id
      });
    }
  };

  render() {
    const { users } = this.props;
    const { loading } = this.state;
    const me = this.props.authUser.uid;
    const usersWithoutMe = users.filter(u => u.uid !== me);
    return (
      <div>
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {usersWithoutMe.map(user => (
            <li key={user.uid}>
              <Link to={`${ROUTES.USERS}/${user.uid}`}>
                <strong>{user.username}</strong>
              </Link>
              <input type="button" onClick={() => this.askMatch(user)}
                     value="Ask match" />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: Object.keys(state.userState.users || {}).map(key => ({
    ...state.userState.users[key],
    uid: key
  })),
  authUser: state.sessionState.authUser
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: 'USERS_SET', users })
});
const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserList);
