import React from 'react';
import bcrypt from 'bcryptjs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../button/index.jsx';
import Input from '../input/index.jsx';

class RegistrationForm extends React.Component {

  handleRegistration = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const payload = { 
      email: this.props.email.value,
      digest: bcrypt.hashSync(this.props.password.value, 10)
    };
    const request = new Request('http://%%API_SERVER_HOST%%:%%API_SERVER_PORT%%/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      body: JSON.stringify(payload)
    })
    fetch(request)
      .then(response => {
        if (response.status === 201) {
          return response.text();
        } else {
          throw new Error('Error creating new user');
        }
      })
      .then(this.props.handleSuccess)
      .catch(console.error)
  }

  render() {
    if(this.props.userId) {
      return (
        <div id="registration-success">
          <h1>You have registered successfully!</h1>
          <p>Where do you want to go next?</p>
          <Link to='/'><Button title="Home"></Button></Link>
          <Link to='/login'><Button title="Login"></Button></Link>
        </div>
      )
    }
    return [
      <form onSubmit={this.handleRegistration}>
        <Input label="Email" type="email" name="email" id="email" value={this.props.email.value} valid={this.props.email.valid} onChange={this.props.handleInputChange} />
        <Input label="Password" type="password" name="password" id="password" value={this.props.password.value} valid={this.props.password.valid} onChange={this.props.handleInputChange} />
        <Button title="Register" id="register-button" disabled={!(this.props.email.valid && this.props.password.valid)}/>
      </form>,
      <p>Already have an account? <Link to='/login'>Login</Link></p>
    ]
  }
}

function mapStateToProps (state) {
  return state.registrationForm;
}

function mapDispatchToProps (dispatch) {
  return {
    handleInputChange: (name, event) => {
      const value = event.target.value;
      const action = {
        type: 'RegistrationForm:update',
        field: name,
        value
      }
      dispatch(action);
    },
    handleSuccess: userId => {
      const action = {
        type: 'RegistrationForm:success',
        userId
      }
      dispatch(action);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);
