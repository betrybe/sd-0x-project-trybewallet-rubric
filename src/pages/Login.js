import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../actions';

const minPassLength = 6;

class Login extends Component {
  constructor() {
    super();
    this.state = { email: '', password: '', disabled: true };
    this.handleInput = this.handleInput.bind(this);
    this.onClick = this.onClick.bind(this);
    this.renderInput = this.renderInput.bind(this);
  }

  async handleInput({ target }) {
    this.setState({ [target.name]: target.value, disabled: true }, () => {
      const { email, password } = this.state;
      if (
        email.includes('@')
        && email.includes('.com') && !!password
        && password.length >= minPassLength
      ) return this.setState({ disabled: false });
    });
  }

  onClick() {
    const { email, password } = this.state;
    const { login, history } = this.props;
    console.log(login);
    login({ email, password });
    history.push('/carteira');
  }

  renderInput(name) {
    const { state } = this;
    return (<input
      name={ name }
      data-testid={ `${name}-input` }
      value={ state[name] }
      onChange={ this.handleInput }
    />);
  }

  render() {
    const { disabled } = this.state;
    return (
      <div>
        {this.renderInput('email')}
        {this.renderInput('password')}
        <button
          type="button"
          disabled={ disabled }
          onClick={ this.onClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: (login) => dispatch(loginAction(login)),
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
