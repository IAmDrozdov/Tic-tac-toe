import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import * as S from './styled';
import * as ROUTES from "../../constants/routes";

const PasswordForgetPage = () => (
  <S.ContentToCenter>
    <PasswordForgetForm />
  </S.ContentToCenter>
);

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: null
    };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({
          email: '',
          error: null
        });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
    this.props.history.push(ROUTES.SIGN_IN);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <S.Form onSubmit={this.onSubmit}>
        <S.Header>Reset Password</S.Header>
        <S.Input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="E-Mail address"
        />
        <S.Button disabled={isInvalid} type="submit">
          Reset
        </S.Button>

        {error && <S.ErrorText>{error.message}</S.ErrorText>}
      </S.Form>
    );
  }
}

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm };
