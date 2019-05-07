import React, { Component } from 'react';
import { compose } from 'recompose';
import Cell from './Cell';
import { withAuthorization, withEmailVerification } from '../Session';
import * as MATCH_CONSTANTS from '../../constants/match';

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
          switch (win) {
            case this.props.authUser.uid:
              alert('You win');
              break;
            case MATCH_CONSTANTS.DRAW:
              alert('Draw');
              break;
            default:
              alert(' You lost');
              break;
          }
          if (this.state.deskListener) this.state.deskListener();
          matchRef.delete();
        }
      }
    }, error => console.log(error));
  };

  checkCombinations = (field) => {
    const xs = field.filter(c => c.value === MATCH_CONSTANTS.CROSS)
      .map(c => c.index);
    const os = field.filter(c => c.value === MATCH_CONSTANTS.ZERO)
      .map(c => c.index);
    for (let i = 0; i < MATCH_CONSTANTS.WIN_COMBINATIONS.length; i += 1) {
      if (MATCH_CONSTANTS.WIN_COMBINATIONS[i].every(
        e => xs.includes(e))) return MATCH_CONSTANTS.CROSS;
      if (MATCH_CONSTANTS.WIN_COMBINATIONS[i].every(
        e => os.includes(e))) return MATCH_CONSTANTS.ZERO;
    }
    if (field.filter(c => c.value !== null).length ===
      9) return MATCH_CONSTANTS.DRAW;
    return null;
  };

  mark = (idx) => {
    this.props.firebase.match(this.state.id)
      .get()
      .then(doc => {
        const { field, turn, userX, userO } = doc.data();
        field[idx].value = turn === userX
          ? MATCH_CONSTANTS.CROSS
          : MATCH_CONSTANTS.ZERO;
        let win = this.checkCombinations(field);
        switch (win) {
          case MATCH_CONSTANTS.CROSS:
            win = userX;
            break;
          case MATCH_CONSTANTS.ZERO:
            win = userO;
            break;
          case MATCH_CONSTANTS.DRAW:
            win = MATCH_CONSTANTS.DRAW;
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
        {userX && <h2>You are playing {authUser.uid === userX
          ? MATCH_CONSTANTS.CROSS
          : MATCH_CONSTANTS.ZERO}</h2>}
        <h2>Current turn is {authUser.uid === turn ? 'your' : 'enemy'}</h2>
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
