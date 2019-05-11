import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as S from './styled';

const SignInPage = () => (
  <S.ContentToCenter>
    <SignInForm />
  </S.ContentToCenter>
);

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null
    };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({
          email: '',
          password: '',
          error: null
        });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onPressGoogle = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
          this.setState({ error });
        }
      });
    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <S.Form onSubmit={this.onSubmit}>
        <S.Header>Sign In</S.Header>

        <S.Input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <S.Input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <S.Paragraph>
          <S.Span fontSize='20px'>
            Sign In with&ensp;
          </S.Span>
          <S.Span
            link
            fontSize='20px'
            underline
            onClick={this.onPressGoogle}>
            Google
          </S.Span>
        </S.Paragraph>
        {error && <S.ErrorText>{error.message}</S.ErrorText>}
        <S.Button disabled={isInvalid} type="submit">
          Sign In
        </S.Button>
        <S.Paragraph>
          <S.Span
            onClick={() => this.props.history.push(ROUTES.PASSWORD_FORGET)}
            underline
            link>
            Forgot Password?
          </S.Span>
        </S.Paragraph>
        <S.Paragraph>
          <S.Span>
            Dont have an account?&ensp;
          </S.Span>
          <S.Span
            onClick={() => this.props.history.push(ROUTES.SIGN_UP)}
            bold
            link
          >
            Sign Up
          </S.Span>
        </S.Paragraph>
      </S.Form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
