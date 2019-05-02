import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      user: null
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

    this.setState({ loading: false, user });
  }

  render() {
    const { loading, user } = this.state;

    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading user data</div>}

        {user && (
          <div>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
          </div>
        )}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(UserPage);
