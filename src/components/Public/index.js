import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import PublicItem from "./PublicItem";
import { generateMatchId } from "../../utils";
import { withAuthorization, withEmailVerification } from "../Session";
import * as ROUTES from "../../constants/routes";
import * as S from "./styled";

class PublicPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      myRequest: null
    };
  }

  componentDidMount() {
    this.props.firebase.db.collection("public").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        const matches = this.state.matches.slice();
        const data = change.doc.data();
        let { myRequest } = this.state;
        if (change.type === "added") {
          matches.push(data);
          if (data.uid === this.props.authUser.uid) myRequest = data.id;
        } else if (change.type === "removed") {
          const idx = matches.map(e => e.id).indexOf(data.id);
          matches.splice(idx, 1);
          if (data.uid === this.props.authUser.uid) myRequest = null;
        }
        this.setState({ matches, myRequest });
      });
    });
  }

  publishRequest = () => {
    const requestRef = this.props.firebase.db.collection("public").doc();
    requestRef.set({
      id: requestRef.id,
      name: this.props.authUser.username,
      uid: this.props.authUser.uid
    });
  };

  deleteRequest = () => {
    this.props.firebase.public(this.state.myRequest)
      .delete();

  };

  respond = async (match) => {
    const hisRef = this.props.firebase.user(match.uid);
    const myRef = this.props.firebase.user(this.props.authUser.uid);
    const hisActivityRef = this.props.firebase.user(match.uid)
      .collection("activity");
    const hisBlackListWithMe = await hisRef.collection("blacklist")
      .where("uid", "==", this.props.authUser.uid)
      .get();
    if (!hisBlackListWithMe.empty) {
      alert("User blocked you");
      return;
    }
    const myDoc = await myRef.get();
    const hisDoc = await hisRef.get();

    const myInfo = myDoc.data();
    const hisInfo = hisDoc.data();

    if (hisInfo.online && !hisInfo.match) {
      if (myInfo.match) {
        alert("You are already playing");
      } else {
        const matchId = generateMatchId(myInfo.uid, hisInfo.uid);
        const field = [];
        const users = [myInfo.uid, hisInfo.uid];

        for (let i = 0; i < 9; i += 1) field.push(
          { value: null });
        field.forEach((c, i) => c.index = i);
        const userX = users[Math.floor(Math.random() * users.length)];
        const userO = users.filter(u => u !== userX).pop();

        await this.props.firebase
          .match(matchId)
          .set({
            field,
            turn: userX,
            userX,
            userO,
            win: null
          });

        const requestRef = hisActivityRef.doc();
        await requestRef.set({
          date: new Date(),
          uid: myInfo.uid,
          name: myInfo.username,
          type: "match",
          id: requestRef.id,
          matchId
        });
        await myRef.update({ match: matchId });
        await hisRef.update({ match: matchId });
        this.props.firebase.public(match.id).delete();
        this.props.history.push(`${ROUTES.MATCH}/${matchId}`);
      }
    } else {
      alert("Enemy is not ready to play");
    }
  };

  render() {
    const { matches, myRequest } = this.state;
    const { authUser } = this.props;
    return (
      <S.PageContainer>
        {
          myRequest ?
            <S.PublishButton onClick={this.deleteRequest}>
              Delete my request
            </S.PublishButton>
            :
            <S.PublishButton onClick={this.publishRequest}>
              Publish request to play
            </S.PublishButton>
        }
        <S.ItemsContainer>
          {matches.map(match => (
              <PublicItem key={match.id}
                          match={match}
                          uid={authUser.uid}
                          respond={this.respond} />
            )
          )}
        </S.ItemsContainer>
      </S.PageContainer>
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
