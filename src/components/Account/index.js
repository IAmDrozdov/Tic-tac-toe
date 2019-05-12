import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { withAuthorization, withEmailVerification } from "../Session";
import { withFirebase } from "../Firebase";
import PasswordChangeForm from "../PasswordChange";
import { DEFAULT_AVATAR } from "../../constants/user";
import * as S from "./styled";

const SIGN_IN_METHODS = [
  {
    id: "password",
    provider: null
  },
  {
    id: "google.com",
    provider: "googleProvider"
  }
];

const AccountPage = ({ authUser }) => (
  <S.Card>
    <S.AvatarContainer>
      <S.Image avatar
               src={authUser.avatarUrl ? authUser.avatarUrl : DEFAULT_AVATAR}
               alt=""
      />
      <AvatarChangeForm authUser={authUser} />
    </S.AvatarContainer>

    <S.InfoContainer>
      <S.Text main>Email: {authUser.email}</S.Text>
      <S.StatisticsContainer>
        <S.Text>Matches: {authUser.matchesCount}</S.Text>
        <S.Text>Wins: {authUser.winsCount}</S.Text>
        <S.Text>Loses: {authUser.losesCount}</S.Text>
      </S.StatisticsContainer>
      <PasswordChangeForm />
      <LoginManagement authUser={authUser} />
    </S.InfoContainer>
  </S.Card>
);

class AvatarChangeFormBase extends Component {
  constructor(props) {
    super(props);
    this.setRef = ref => {
      this.file = ref;
    };
  };

  submit = async (e) => {
    e.preventDefault();
    const { uid } = this.props.authUser;
    const file = this.file.files[0];
    await this.props.firebase.uploadAvatar(uid, file);
  };

  removeAvatar = async () => {
    const { uid } = this.props.authUser;

    await this.props.firebase.removeAvatar(uid);
  };

  render() {
    return (
      <div>
        <S.ChangeAvatarContainer>
          <form onSubmit={this.submit}>
            <S.InputFile type="file" ref={this.setRef} />
            <S.Button type="submit">Upload</S.Button>
          </form>
        </S.ChangeAvatarContainer>

        <S.LinkPasswordButton
          onClick={this.removeAvatar}>
          Remove avatar
        </S.LinkPasswordButton>
      </div>

    );
  }
}

class LoginManagementBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSignInMethods: [],
      error: null
    };
  }

  componentDidMount() {
    this.fetchSignInMethods();
  }

  fetchSignInMethods = () => {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then(activeSignInMethods =>
        this.setState({ activeSignInMethods, error: null })
      )
      .catch(error => this.setState({ error }));
  };

  onSocialLoginLink = provider => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  onDefaultLoginLink = password => {
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password
    );

    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  onUnlink = providerId => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  render() {
    const { activeSignInMethods, error } = this.state;

    return (
      <div>
        <S.Text>Sign In Methods:</S.Text>
        <div>
          {SIGN_IN_METHODS.map(signInMethod => {
            const onlyOneLeft = activeSignInMethods.length === 1;
            const isEnabled = activeSignInMethods.includes(
              signInMethod.id
            );

            return signInMethod.id === "password" ? (
              <DefaultLoginToggle
                onlyOneLeft={onlyOneLeft}
                isEnabled={isEnabled}
                signInMethod={signInMethod}
                onLink={this.onDefaultLoginLink}
                onUnlink={this.onUnlink}
              />
            ) : (
              <SocialLoginToggle
                onlyOneLeft={onlyOneLeft}
                isEnabled={isEnabled}
                signInMethod={signInMethod}
                onLink={this.onSocialLoginLink}
                onUnlink={this.onUnlink}
              />

            );
          })}
        </div>
        {error && <S.ErrorText>error.message </S.ErrorText>}
      </div>
    );
  }
}

const SocialLoginToggle = ({
                             onlyOneLeft,
                             isEnabled,
                             signInMethod,
                             onLink,
                             onUnlink
                           }) =>
  isEnabled ? (
    <S.Button
      type="button"
      onClick={() => onUnlink(signInMethod.id)}
      disabled={onlyOneLeft}
    >
      Deactivate {signInMethod.id}
    </S.Button>
  ) : (
    <S.Button
      type="button"
      onClick={() => onLink(signInMethod.provider)}
    >
      Link {signInMethod.id}
    </S.Button>
  );

class DefaultLoginToggle extends Component {
  constructor(props) {
    super(props);

    this.state = { passwordOne: "", passwordTwo: "" };
  }

  onSubmit = event => {
    event.preventDefault();

    this.props.onLink(this.state.passwordOne);
    this.setState({ passwordOne: "", passwordTwo: "" });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      onlyOneLeft,
      isEnabled,
      signInMethod,
      onUnlink
    } = this.props;

    const { passwordOne, passwordTwo } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === "";

    return isEnabled ? (
      <S.Button
        type="button"
        onClick={() => onUnlink(signInMethod.id)}
        disabled={onlyOneLeft}
      >
        Deactivate {signInMethod.id}
      </S.Button>
    ) : (
      <form onSubmit={this.onSubmit}>
        <S.Input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <S.Input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />

        <S.LinkPasswordButton disabled={isInvalid} type="submit">
          Link {signInMethod.id}
        </S.LinkPasswordButton>
      </form>
    );
  }
}

const LoginManagement = withFirebase(LoginManagementBase);

const AvatarChangeForm = withFirebase(AvatarChangeFormBase);
const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const condition = authUser => !!authUser;

export default compose(
  connect(mapStateToProps),
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
