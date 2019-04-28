import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';

import { withAuthorization, withEmailVerification } from '../Session';

class PublicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      myRequest: null
    };
  }

  componentDidMount() {
    this.props.firebase.db.collection('public').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        const matches = this.state.matches.slice();
        const data = change.doc.data();
        let { myRequest } = this.state;
        if (change.type === 'added') {
          matches.push(data);
          if (data.uid === this.props.authUser.uid) myRequest = data.id;
        } else if (change.type === 'removed') {
          const idx = matches.map(e => e.id).indexOf(data.id);
          matches.splice(idx, 1);
          if (data.uid === this.props.authUser.uid) myRequest = null;
        }
        this.setState({ matches, myRequest });
      });
    });
  }

  publishRequest = () => {
    const requestRef = this.props.firebase.db.collection('public').doc();
    requestRef.set({
      id: requestRef.id,
      name: this.props.authUser.username,
      uid: this.props.authUser.uid
    });
  };

  deleteRequest = () => {
    this.props.firebase.db.collection('public')
      .doc(this.state.myRequest)
      .delete();

  };

  respond = async (m) => {
    const hisActivityRef = this.props.firebase.user(m.uid)
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
        message: `Your request to ${m.username} is pending`
      });
      const requestRef = hisActivityRef.doc();
      requestRef.set({
        date: new Date(),
        uid: this.props.authUser.uid,
        name: this.props.authUser.username,
        type: 'p-request',
        id: requestRef.id,
        bindedActivity: newActivityRef.id,
        publicRef: m.id
      });
    }
  };

  render() {
    const { matches, myRequest } = this.state;
    const { authUser } = this.props;
    return (
      <div>
        <h1>Public Page</h1>
        {
          myRequest ?
            <input type="button" value='Delete my request'
                   onClick={this.deleteRequest} />
            :
            <input type="button" value='Publish request to play'
                   onClick={this.publishRequest} />
        }
        {matches.map(m => (
          <li key={m.id}>
            {
              m.uid !== authUser.uid ?
                <Link to={`${ROUTES.USERS}/${m.uid}`}>{m.name}</Link>
                :
                'your request'
            }

            {m.uid !== authUser.uid &&
            <input type="button" value='respond'
                   onClick={() => {
                     return this.respond(m);
                   }} />
            }
          </li>
        ))}
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
  connect(mapStateToProps)
)(PublicPage);
