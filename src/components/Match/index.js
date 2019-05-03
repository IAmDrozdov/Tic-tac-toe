import React, { Component } from 'react';
import { compose } from 'recompose';
import Cell from './Cell';
import { withAuthorization, withEmailVerification } from '../Session';

const WIN_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [6, 7, 8]
];

class MatchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      verified: false,
      deskListener: null
    };
  }

  async componentDidMount() {
    const matchRef = this.props.firebase.match(this.state.id);
    const matchDoc = await matchRef.get();
    if (!matchDoc.exists) {
      this.props.history.push('/');
    } else {
      const match = matchDoc.data();
      const { userX, userO } = match;
      if (![userX, userO].includes(this.props.authUser.uid)) {
        this.props.history.push('/');
      } else {
        const deskListener = this.subscribeDesk();
        this.setState({ verified: true, ...match, deskListener });
      }
    }
  }

  componentWillUnmount() {
    if (this.state.deskListener) this.state.deskListener();
  }

  subscribeDesk = () => {
    const matchRef = this.props.firebase.match(this.state.id);
    return matchRef.onSnapshot(doc => {
      if (doc.exists) {
        const { field, win, turn } = doc.data();
        this.setState({ field, turn });
        if (win) {
          if (win === this.props.authUser.uid) {
            alert('You win');
          } else {
            alert(' You lost');
          }
          if (this.state.deskListener) this.state.deskListener();
          matchRef.delete();
        }
      }
    }, error => console.log(error));
  };

  checkCombinations = (field) => {
    const xs = field.filter(c => c.value === 'X').map(c => c.index);
    const os = field.filter(c => c.value === 'O').map(c => c.index);
    for (let i = 0; i < WIN_COMBINATIONS.length; i += 1) {
      if (WIN_COMBINATIONS[i].every(e => xs.includes(e))) return 'X';
      if (WIN_COMBINATIONS[i].every(e => os.includes(e))) return 'O';
    }
    return null;
  };

  mark = (idx) => {
    this.props.firebase.match(this.state.id)
      .get()
      .then(doc => {
        const { field, turn, userX, userO } = doc.data();
        field[idx].value = turn === userX ? 'X' : 'O';
        let win = this.checkCombinations(field);
        switch (win) {
          case 'X':
            win = userX;
            break;
          case 'O':
            win = userO;
            break;
          default:
            break;
        }
        doc.ref.update({ field, turn: turn === userX ? userO : userX, win });
      });
  };

  render() {
    const { id, verified, field, userX, turn } = this.state;

    const { authUser } = this.props;
    return (
      <div>
        <h1>MatchPage {id}</h1>
        {userX && <h2>You are playing {authUser.uid === userX ? 'X' : 'O'}</h2>}
        <div style={{
          width: '50%',
          display: 'grid',
          gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)',
          gridGap: '10px'
        }}>
          {verified && (
            field.map(cell => (
              <Cell key={cell.index}
                    cell={cell}
                    idx={cell.index}
                    mark={this.mark}
                    disableClick={cell.value || turn !== authUser.uid}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(MatchPage);
