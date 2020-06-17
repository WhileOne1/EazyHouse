import React from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Message from '@material-ui/core/Snackbar';
import InputLabel from '@material-ui/core/InputLabel';
const registerMutation = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
    {
      ok
      errors {
        path
        message
      }
    }
  }
`;
class Register extends React.Component {
  state = {
    username: '',
    usernameError: '',
    emailError: '',
    email: '',
    password: '',
    passwordError: '',
  };

  onSubmit = async () => {
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: '',
    });

    const { username, email, password } = this.state;
    const response = await this.props.mutate({
      variables: { username, email, password },
    });

    const { ok, errors } = response.data.register;

    if (ok) {
      this.props.history.push('/');
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        // err['passwordError'] = 'too long..';
        err[`${path}Error`] = message;
      });

      this.setState(err);
    }

    console.log(response);
  };

  onChange = e => {
    const { name, value } = e.target;
    // name = "email";
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password, usernameError,emailError,passwordError } = this.state;
    const errorList = [];

    if (usernameError) {
      errorList.push(usernameError);
    }

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }
    const { onChange, onSubmit } = this;
    return (
      <Container text>
          <h2>Register</h2>
        <Input label="Filled"
          error={!!usernameError}
          name="username"
          onChange={onChange}
          value={username}
          placeholder="Username"
          fluid
        />
        <Input label="Filled" error={!!emailError}  name="email" onChange={onChange} value={email} placeholder="Email" fluid />
        <Input label="Filled"
          error={!!passwordError}
          name="password"
          onChange={onChange}
          value={password}
          type="password"
          placeholder="Password"
          
        />
        <Button onClick={(username && email && password) ? onSubmit : null }>Submit</Button>
        {usernameError || emailError || passwordError ? (
          <Message severity="error" message="There was some errors with your submission" action={errorList} />
        ) : null}
      </Container>
    );
  }
}



export default graphql(registerMutation)(Register);