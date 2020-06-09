import React from 'react';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  };

  onSubmit = async () => {
    const response = await this.props.mutate({
      variables: this.state,
    });

    console.log(response);
  };

  onChange = e => {
    const { name, value } = e.target;
    // name = "email";
    this.setState({ [name]: value });
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <Container text>
          <h2>Register</h2>
        <Input
          name="username"
          onChange={this.onChange}
          value={username}
          placeholder="Username"
          fluid
        />
        <Input name="email" onChange={this.onChange} value={email} placeholder="Email" fluid />
        <Input
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          placeholder="Password"
          fluid
        />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password)
  }
`;

export default graphql(registerMutation)(Register);