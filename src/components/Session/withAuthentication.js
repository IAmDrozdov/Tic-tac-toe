import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.props.onSetAuthUser(
        JSON.parse(localStorage.getItem("authUser"))
      );
    }

    componentDidMount() {
      this.authListener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem("authUser", JSON.stringify(authUser));
          this.props.onSetAuthUser(authUser);
          this.matchListener = this.props.firebase.user(authUser.uid)
            .onSnapshot(doc => {
              const { match } = doc.data();
              this.props.onChangeCurrentMatch(match);
            });
          this.activityListener = this.props.firebase.activity(authUser.uid)
            .where("viewed", "==", false)
            .onSnapshot(qds => qds.docChanges().forEach(change => {
                const data = change.doc.data();
                if (change.type === "added") {
                  this.props.onAddUnreadActivity(data.id);
                } else if (change.type === "modified") {
                  console.log("  modified", data);
                } else if (change.type === "removed") {
                  this.props.onRemoveUnreadActivity(data.id);
                }
              })
            );
        },
        () => {
          localStorage.removeItem("authUser");
          this.props.onSetAuthUser(null);
        }
      );

    }

    componentWillUnmount() {
      this.authListener();
      if (this.matchListener) this.matchListener();
      if (this.activityListener) this.activityListener();
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser =>
      dispatch({ type: "AUTH_USER_SET", authUser }),
    onAddUnreadActivity: activity =>
      dispatch({ type: "ACTIVITY_UNREAD_ADD", activity }),
    onRemoveUnreadActivity: activity =>
      dispatch({ type: "ACTIVITY_UNREAD_REMOVE", activity }),
    onChangeCurrentMatch: match =>
      dispatch({ type: "CURRENT_MATCH_SET", match })
  });

  return compose(
    withFirebase,
    connect(
      null,
      mapDispatchToProps
    )
  )(WithAuthentication);
};

export default withAuthentication;
