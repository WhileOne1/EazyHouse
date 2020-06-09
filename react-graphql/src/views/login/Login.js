import React from 'react';
import {extendObservable}from 'mobx';
import {observer} from 'mobx-react';
import { Button, Input, Container } from '@material-ui/core';
import gql from 'graphql-tag'
import { graphql } from 'react-apollo';
const loginMutation = gql`
mutation($email: String!, $password: String!){
    login( email:$email,password:$password){
      ok
        token
      refreshToken
      errors{
        path
        message
      }
    }
      }
`;

class Login extends React.Component {
    constructor(props) {
        super(props);
    
        extendObservable(this, {
          email: '',
          password: '',
          errors: {},
        });
      }
    
      onSubmit = async () => {
        const { email, password } = this;
        const response = await this.props.mutate({
          variables: { email, password },
        });
    
        console.log(response);
    
        const {
          ok, token, refreshToken, errors,
        } = response.data.login;
    
        if (ok) {
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          this.props.history.push('/');
        } else {
          const err = {};
          errors.forEach(({ path, message }) => {
            err[`${path}Error`] = message;
          });
    
          this.errors = err;
        }
      };
    
      onChange = (e) => {
        const { name, value } = e.target;
        this[name] = value;
      };
    
      render() {
        const { email, password, errors: { emailError, passwordError } } = this;

    const errorList = [];

    if (emailError) {
      errorList.push(emailError);
    }

    if (passwordError) {
      errorList.push(passwordError);
    }
        return (
          <Container text>
            <h2>Login</h2>
            <Input name="email" error={emailError} onChange={this.onChange} value={email} placeholder="Email" fluid />
            <Input
                error={passwordError}
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

  export default graphql(loginMutation)(observer(Login));