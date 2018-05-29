import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';
import IconKeyboardArrowUp from 'mineral-ui-icons/IconKeyboardArrowUp';
import IconKeyboardArrowDown from 'mineral-ui-icons/IconKeyboardArrowDown';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import {
  Box,
  Text,
  TextArea,
  FormField,
  Dropdown,
  Button,
  Select,
  Link,
} from 'mineral-ui';

export class NewEncryptionPanel extends Component {
  static propTypes = {
    secretKey: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    cipher: PropTypes.func.isRequired,
  };

  state = {
    originalMessage: '',
    encryptedMessage: '',
  };

  beginEncryption = (method, message) => {
    const { cipher, secretKey } = this.props;
    try {
      const result = cipher[method](message, secretKey);
      return result;
    } catch (error) {
      return error;
    }
  };

  encrypt = evt => {
    evt.preventDefault();
    const encryptedMessage = this.beginEncryption(
      'encrypt',
      this.state.originalMessage,
    );
    this.setState({ encryptedMessage });
  };

  decrypt = evt => {
    evt.preventDefault();
    const originalMessage = this.beginEncryption(
      'decrypt',
      this.state.encryptedMessage,
    );
    this.setState({ originalMessage });
  };

  onChangeMessage = ({ target: { value, name } }) =>
    this.setState({ [name]: value });

  render() {
    const { message } = this.state;
    return (
      <Fragment>
        <Box>
          <FormField
            label="Original Message"
            required={!this.state.originalMessage}
          >
            <TextArea
              rows="3"
              name="originalMessage"
              value={this.state.originalMessage}
              onChange={this.onChangeMessage}
            />
          </FormField>
        </Box>
        <Flex justifyContent="between" padding="0.5em">
          <FlexItem>
            <Button
              iconEnd={<IconKeyboardArrowDown />}
              onClick={this.encrypt}
              minimal
              disabled={!this.props.secretKey || !this.state.originalMessage}
            >
              Encrypt
            </Button>
          </FlexItem>
          <FlexItem>
            <Button
              iconStart={<IconKeyboardArrowUp />}
              onClick={this.decrypt}
              disabled={!this.props.secretKey || !this.state.encryptedMessage}
              minimal
            >
              Decrypt
            </Button>
          </FlexItem>
        </Flex>
        <Box>
          <FormField
            label="Encrypted Message"
            required={!this.state.encryptedMessage}
          >
            <TextArea
              rows="3"
              name="encryptedMessage"
              value={this.state.encryptedMessage}
              onChange={this.onChangeMessage}
            />
          </FormField>
        </Box>
      </Fragment>
    );
  }
}

export default NewEncryptionPanel;
