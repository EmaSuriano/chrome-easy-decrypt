import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';

export class Encrypt extends Component {
  static propTypes = {
    secretKey: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
    encryptMethod: PropTypes.func.isRequired,
  };

  state = {
    message: '',
  };

  encryptMessage = () => {
    const result = this.props.encryptMethod.encrypt(
      this.state.message,
      this.props.secretKey,
    );
    return this.props.onSuccess(result);
  };

  onChangeMessage = ({ target: { value } }) =>
    this.setState({ message: value });

  render() {
    const { message } = this.state;
    return (
      <Fragment>
        <label htmlFor="encrypt-text">Message to encrypt:</label>
        <input
          type="text"
          id="encrypt-text"
          value={message}
          onChange={this.onChangeMessage}
        />
        <button onClick={this.encryptMessage} type="button">
          Ok
        </button>
      </Fragment>
    );
  }
}

export default Encrypt;
