import React, { Component } from 'react';
import { compose } from 'recompose';
import UserItem from './UserItem';
import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      onlineSort: 'all',
      users: [],
      usersToDisplay: []
    };
  }

  async componentDidMount() {
    if (!this.state.users.length) {
      this.setState({ loading: true });
    }
    const snapshot = await this.props.firebase
      .users()
      .get();
    let users = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      users.push(data);
    });
    users = users.filter(u => u.uid !== this.props.authUser.uid);
    this.setState({
      loading: false,
      users,
      usersToDisplay: users
    });
  }

  handleSelectChange = (e) => {
    const sorting = e.target.value;
    let usersToDisplay = this.state.users.filter(
      u => u.uid !== this.props.authUser.uid);
    switch (sorting) {
      case 'online':
        usersToDisplay = usersToDisplay.filter(u => u.online);
        break;
      case 'offline':
        usersToDisplay = usersToDisplay.filter(u => !u.online);
        break;
      default:
        break;
    }
    this.setState({ onlineSort: sorting, usersToDisplay });
  };

  render() {
    const { loading, onlineSort, usersToDisplay } = this.state;
    return (
      <div>
        <h2>Users</h2>
        {loading && <div>Loading users</div>}
        <select value={onlineSort} onChange={this.handleSelectChange}>
          <option value="all">all</option>
          <option value="online">online</option>
          <option value="offline">offline</option>
        </select>
        <ul>
          {usersToDisplay.map(user => (
            <UserItem user={user} key={user.uid}/>
          ))}
        </ul>
      </div>
    );
  }
}

const
  condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase)(UserList);
