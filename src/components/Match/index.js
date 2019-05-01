import React, { Component } from 'react';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';

class MatchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      verified: false
    };
  }

  componentDidMount() {
    this.props.firebase.match(this.state.id).get().then(doc => {
      if (!doc.exists) {
        this.props.history.push('/');
      } else {
        const { users } = doc.data();
        if (!users.includes(this.props.authUser.uid)) {
          this.props.history.push('/');
        } else {
          this.setState({ verified: true });
        }
      }
    });
  }

  render() {
    const { id, verified } = this.state;
    return (
      <div>
        <h1>MatchPage {id}</h1>
        {verified && (
          <div>MATCH PLAYING</div>
        )}
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(MatchPage);
