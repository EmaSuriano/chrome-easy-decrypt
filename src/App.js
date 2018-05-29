import React, { Component, Fragment } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Ciphers, STATUS_ENCRYPTION } from './utils';
import CryptoJS from 'crypto-js';
import EncryptionPanel from './screens/EncryptionPanel';
import './App.css';
import IconVpnKey from 'mineral-ui-icons/IconVpnKey';
import IconLockOutline from 'mineral-ui-icons/IconLockOutline';
import EncryptionResult from './shared/EncryptionResult';
import NewEncryptionPanel from './shared/NewEncryptionPanel';
import { ThemeProvider } from 'mineral-ui/themes';
import {
  Box,
  Text,
  TextInput,
  FormField,
  Dropdown,
  Button,
  Select,
  Link,
} from 'mineral-ui';

const cipherList = Object.keys(Ciphers).map(encryperName => ({
  text: encryperName,
  value: encryperName,
}));

class ErrorBoundary extends React.Component {
  state = {
    error: null,
  };

  componentDidCatch(error) {
    console.log(error);
    this.setState({
      error,
    });
  }

  render() {
    return this.state.error ? (
      <div>
        <h2>Oh-no! Something went wrong</h2>
        <p className="red">{this.state.error && this.state.error.toString()}</p>
      </div>
    ) : (
      this.props.children
    );
  }
}

const Separator = () => (
  <div style={{ border: ' 1px solid #c8d1e0', height: '1px' }} />
);

class App extends Component {
  state = {
    secretKey: '',
    result: {
      message: 'Please encrypt or decrypt your message!',
      status: STATUS_ENCRYPTION.IDLE,
    },
    selectedCipher: cipherList[0].value,
  };

  onSuccessEncryption = encrypted =>
    this.setState({
      result: {
        message: encrypted,
        status: STATUS_ENCRYPTION.SUCCESS,
      },
    });

  onErrorEncryption = error =>
    this.setState({
      result: {
        message: error.toString(),
        status: STATUS_ENCRYPTION.ERROR,
      },
    });

  render() {
    const { result, secretKey, selectedCipher } = this.state;
    const cipher = Ciphers[selectedCipher];

    return (
      <ThemeProvider>
        <ErrorBoundary>
          <Box
            width="20em"
            marginHorizontal="auto"
            textAlign="center"
            marginBottom="1em"
            marginTop="0.5em"
          >
            <Text element="h2" align="center" verticalAlign="bottom">
              Easy Encrypt{' '}
              <IconVpnKey size="1.5em" verticalAlign="bottom" color="gold" />
            </Text>
            <Separator />
          </Box>
          <Box marginHorizontal="auto" textAlign="center" width="16em">
            <Box marginBottom="1em">
              <FormField
                label="Cipher"
                onSelect={({ value }) =>
                  this.setState({ selectedCipher: value })
                }
                caption={
                  <span>
                    Encryption Algorithm,{' '}
                    <Link
                      target="_blank"
                      href="https://github.com/brix/crypto-js/blob/develop/docs/QuickStartGuide.wiki#Ciphers"
                    >
                      for more information.
                    </Link>
                  </span>
                }
              >
                <Select data={cipherList} defaultSelectedItem={cipherList[0]} />
              </FormField>
            </Box>
            <Box marginBottom="1em">
              <FormField
                label="Secret Key"
                {...!this.state.secretKey && { required: true }}
                caption="Cipher seed, it will be used in the process."
              >
                <TextInput
                  id="secretKey"
                  type="password"
                  value={this.state.secretKey}
                  onChange={({ target: { id, value } }) =>
                    this.setState({ [id]: value })
                  }
                />
              </FormField>
            </Box>
            <NewEncryptionPanel
              secretKey={this.state.secretKey}
              onSuccess={this.onSuccessEncryption}
              onError={this.onErrorEncryption}
              cipher={cipher}
            />
            <Box marginTop="10px" marginBottom="10px">
              <Text align="right">
                <Link
                  target="_blank"
                  href="https://github.com/EmaSuriano/chrome-easy-decrypt"
                >
                  Contribute to this project!
                </Link>
              </Text>
            </Box>
          </Box>
        </ErrorBoundary>
      </ThemeProvider>
    );
  }
}

export default App;
