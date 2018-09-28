import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import deepmerge from 'deepmerge';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { validator } from './utils';
import RegistrationForm from './components/registration-form/index.jsx';
import LoginForm from './components/login-form/index.jsx';

const initialState = {
  loginForm: {
    token: null,
    email: {
      value: "",
      valid: null
    },
    password: {
      value: "",
      valid: null
    }
  },
  registrationForm: {
    userId: null,
    email: {
      value: "",
      valid: null
    },
    password: {
      value: "",
      valid: null
    }
  }
};

const reducer = function (state = initialState, action) {
  if (action.type === 'RegistrationForm:update') {
    const { field, value } = action;
    const valid = validator[field](value);
    const newState = {
      registrationForm: {
        [field]: {
          value,
          valid
        }
      }
    }
    return deepmerge(state, newState);
  }
  if (action.type === 'RegistrationForm:success') {
    const { userId } = action;
    const newState = {
      registrationForm: { userId }
    }
    return deepmerge(state, newState);
  }
  if (action.type === 'LoginForm:update') {
    const { field, value } = action;
    const valid = validator[field](value);
    const newState = {
      loginForm: {
        [field]: {
          value,
          valid
        }
      }
    }
    return deepmerge(state, newState);
  }
  if (action.type === 'LoginForm:success') {
    const { token } = action;
    const newState = {
      loginForm: { token }
    }
    return deepmerge(state, newState);
  }
  return state;
}
const store = createStore(reducer, initialState);

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
      <Route exact path="/register" component={RegistrationForm} />
      <Route exact path="/login" component={LoginForm} />
      </Switch>
    </BrowserRouter>
  </Provider>
), document.getElementById('renderTarget'));
