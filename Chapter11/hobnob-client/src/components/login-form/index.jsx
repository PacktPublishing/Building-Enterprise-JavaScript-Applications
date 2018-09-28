import React from 'react';
import bcrypt from 'bcryptjs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { validator } from '../../utils';
import Button from '../button/index.jsx';
import Input from '../input/index.jsx';

function retrieveSalt (email) {
  const url = new URL('http://%%API_SERVER_HOST%%:%%API_SERVER_PORT%%/salt/');
  url.search = new URLSearchParams({ email });

  const request = new Request(url, {
    method: 'GET',
    mode: 'cors'
  });

  return fetch(request)
    .then(response => {
      if (response.status === 200) {
        return response.text();
      } else {
        throw new Error('Error retrieving salt');
      }
    })
}

function login (email, digest) {

  // Send the credentials to the server
  const payload = { email, digest };
  const request = new Request('http://%%API_SERVER_HOST%%:%%API_SERVER_PORT%%/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(payload)
  })
  return fetch(request)
    .then(response => {
      if (response.status === 200) {
        return response.text();
      } else {
        throw new Error('Error logging in');
      }
    })
}

class LoginForm extends React.Component {

  handleLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const email = this.props.email.value;
    const password = this.props.password.value;

    retrieveSalt(email)
      .then(salt => bcrypt.hashSync(password, salt))
      .then(digest => login(email, digest))
      .then(this.props.handleSuccess)
      .catch(console.error)
  }

  render() {
    if(this.props.token) {
      return (
        <div id="login-success">
          <h1>You have logged in successfully!</h1>
          <p>Where do you want to go next?</p>
          <Link to='/'><Button title="Home"></Button></Link>
          <Link to='/profile'><Button title="Profile"></Button></Link>
        </div>
      )
    }
    return [
      <form onSubmit={this.handleLogin}>
        <Input label="Email" type="email" name="email" id="email" value={this.props.email.value} valid={this.props.email.valid} onChange={this.props.handleInputChange} />
        <Input label="Password" type="password" name="password" id="password" value={this.props.password.value} valid={this.props.password.valid} onChange={this.props.handleInputChange} />
        <Button title="Login" id="login-button" disabled={!(this.props.email.valid && this.props.password.valid)}/>
      </form>,
      <p>Don't have an account? <Link to='/register'>Register</Link></p>
    ]
  }
}

function mapStateToProps (state) {
  return state.loginForm;
}

function mapDispatchToProps (dispatch) {
  return {
    handleInputChange: (name, event) => {
      const value = event.target.value;
      const action = {
        type: 'LoginForm:update',
        field: name,
        value
      }
      dispatch(action);
    },
    handleSuccess: token => {
      const action = {
        type: 'LoginForm:success',
        token
      }
      dispatch(action);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
