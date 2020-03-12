import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { IconKeyboardArrowUp, IconKeyboardArrowDown } from 'mineral-ui-icons';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import { TextArea, FormField, Button } from 'mineral-ui';
import { onChangeText } from '../utils';

const ERROR_MESSAGE =
  "Can't cipher, please check secret key and cipher method!";

class EncryptionPanel extends Component {
  static propTypes = {
    secretKey: PropTypes.string.isRequired,
    cipher: PropTypes.shape({
      encrypt: PropTypes.func.isRequired,
      decrypt: PropTypes.func.isRequired,
    }),
  };

  state = {
    originalMessage: '',
    encryptedMessage: '',
  };

  onChangeMessage = onChangeText.bind(this);

  beginEncryption = (method, message) => {
    const { cipher, secretKey } = this.props;
    return cipher[method](message, secretKey);
  };

  encrypt = evt => {
    evt.preventDefault();
    try {
      const encryptedMessage = this.beginEncryption(
        'encrypt',
        this.state.originalMessage,
      );
      this.setState({
        encryptedMessage,
        error: '',
      });
    } catch (error) {
      this.setState({
        error: 'encrypt',
      });
    }
  };

  decrypt = evt => {
    evt.preventDefault();
    try {
      const originalMessage = this.beginEncryption(
        'decrypt',
        this.state.encryptedMessage,
      );
      this.setState({
        originalMessage,
        error: '',
      });
    } catch (error) {
      this.setState({
        error: 'decrypt',
      });
    }
  };

  render() {
    const { originalMessage, encryptedMessage, error } = this.state;
    const { secretKey } = this.props;
    return (
      <Fragment>
        <FormField
          label="Original Message"
          required={!originalMessage}
          {...(error === 'encrypt' && {
            variant: 'danger',
            caption: ERROR_MESSAGE,
          })}
        >
          <TextArea
            rows={3}
            id="originalMessage"
            value={originalMessage}
            onChange={this.onChangeMessage}
          />
        </FormField>
        <Flex justifyContent="between" padding="0.5em">
          <FlexItem>
            <Button
              iconEnd={<IconKeyboardArrowDown />}
              onClick={this.encrypt}
              minimal
              disabled={!secretKey || !originalMessage}
            >
              Encrypt
            </Button>
          </FlexItem>
          <FlexItem>
            <Button
              iconStart={<IconKeyboardArrowUp />}
              onClick={this.decrypt}
              disabled={!secretKey || !encryptedMessage}
              minimal
            >
              Decrypt
            </Button>
          </FlexItem>
        </Flex>
        <FormField
          label="Encrypted Message"
          required={!encryptedMessage}
          {...(error === 'decrypt' && {
            variant: 'danger',
            caption: ERROR_MESSAGE,
          })}
        >
          <TextArea
            rows={3}
            id="encryptedMessage"
            value={encryptedMessage}
            onChange={this.onChangeMessage}
          />
        </FormField>
      </Fragment>
    );
  }
}

export default EncryptionPanel;
