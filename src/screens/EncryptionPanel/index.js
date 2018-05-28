import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';

export class EncryptionPanel extends Component {
  static propTypes = {
    secretKey: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    encryptMethod: PropTypes.func.isRequired,
  };

  state = {
    message: '',
  };

  beginEncryption = () => {
    const { encryptMethod, secretKey, onSuccess, onError } = this.props;
    try {
      const result = encryptMethod(this.state.message, secretKey);
      return onSuccess(result);
    } catch (error) {
      return onError(error);
    }
  };

  onChangeMessage = ({ target: { value } }) =>
    this.setState({ message: value });

  render() {
    const { message } = this.state;
    return (
      <Fragment>
        <label htmlFor="encrypt-text">Message: </label>
        <input
          type="text"
          id="encrypt-text"
          value={message}
          onChange={this.onChangeMessage}
        />
        <button onClick={this.beginEncryption} type="button">
          Ok
        </button>
      </Fragment>
    );
  }
}

export default EncryptionPanel;
