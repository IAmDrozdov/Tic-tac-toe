import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { DEFAULT_AVATAR } from '../../constants/user';

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null,
      blocked: false
    };
  }

  async componentDidMount() {
    if (!this.state.user) {
      this.setState({ loading: true });
    }
    const userDoc = await this.props.firebase
      .user(this.props.match.params.id)
      .get();
    const user = userDoc.data();
    const blackList = await this.props.firebase
      .user(this.props.authUser.uid)
      .collection('blacklist')
      .get();
    blackList.docs.forEach(qds => {
      if (qds.data().uid === user.uid) this.setState({ blocked: true });
    });
    this.setState({ loading: false, user });
  }

  blockUser = async () => {
    const { empty, docs } = await this.props.firebase.user(
      this.props.authUser.uid)
      .collection('blacklist')
      .where('uid', '==', this.state.user.uid)
      .get();
    if (empty) {
      this.props.firebase.user(this.props.authUser.uid)
        .collection('blacklist')
        .add({ uid: this.state.user.uid });
      this.setState({blocked: true})
    } else {
      docs.forEach(ds => {
        ds.ref.delete();
      });
      this.setState({blocked: false})
    }
  };

  render() {
    const { loading, user, blocked } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading user data</div>}

        {user && (
          <div>
            <img style={{height: '200px', width: '200px'}} src={user.avatarUrl ? user.avatarUrl : DEFAULT_AVATAR}/>

            <span>Matches: {user.matchesCount || 0} </span>
            <span>Loses: {user.losesCount || 0} </span>
            <span>Wins: {user.winsCount || 0}</span>
            <br />
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <input type="button" value={blocked ? 'unblock' : 'block'}
                   onClick={this.blockUser} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});
const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  connect(mapStateToProps),
  withFirebase
)(UserPage);
