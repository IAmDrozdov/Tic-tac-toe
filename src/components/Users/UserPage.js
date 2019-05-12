import React, { Component } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { DEFAULT_AVATAR } from "../../constants/user";
import * as S from "./styled";

import { withFirebase } from "../Firebase";
import { withAuthorization, withEmailVerification } from "../Session";

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
      .collection("blacklist")
      .get();
    blackList.docs.forEach(qds => {
      if (qds.data().uid === user.uid) this.setState({ blocked: true });
    });
    this.setState({ loading: false, user });
  }

  blockUser = async () => {
    const { empty, docs } = await this.props.firebase.user(
      this.props.authUser.uid)
      .collection("blacklist")
      .where("uid", "==", this.state.user.uid)
      .get();
    if (empty) {
      this.props.firebase.user(this.props.authUser.uid)
        .collection("blacklist")
        .add({ uid: this.state.user.uid });
      this.setState({ blocked: true });
    } else {
      docs.forEach(ds => {
        ds.ref.delete();
      });
      this.setState({ blocked: false });
    }
  };

  render() {
    const { loading, user, blocked } = this.state;

    return (
      user && (
        <S.Card>

          <S.Image avatar
                   src={user.avatarUrl ? user.avatarUrl : DEFAULT_AVATAR}
                   alt="" />
          <S.InfoContainer>
            <S.TextCard username>{user.username}</S.TextCard>
            <S.StatisticsContainer>
              <S.TextCard>Matches: {user.matchesCount || 0} </S.TextCard>
              <S.TextCard>Loses: {user.losesCount || 0} </S.TextCard>
              <S.TextCard>Wins: {user.winsCount || 0}</S.TextCard>
            </S.StatisticsContainer>
            <S.Button onClick={this.blockUser}>{blocked ? "unblock" : "block"}</S.Button>
          </S.InfoContainer>


        </S.Card>
      )

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
