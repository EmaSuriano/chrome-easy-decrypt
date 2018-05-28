import React, { Component, Fragment } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Ciphers, STATUS_ENCRYPTION } from './utils';
import CryptoJS from 'crypto-js';
import EncryptionPanel from './screens/EncryptionPanel';
import './App.css';
import EncryptionResult from './shared/EncryptionResult';
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
    return (
      <Fragment>
        {this.props.children}
        {this.state.error && (
          <div>
            <h2>Oh-no! Something went wrong</h2>
            <p className="red">
              {this.state.error && this.state.error.toString()}
            </p>
          </div>
        )}
      </Fragment>
    );
  }
}

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
            marginBottom="2em"
          >
            <header className="App-header">
              <Text element="h1" align="center" color="white">
                Easy Encrypt 🔑
              </Text>
            </header>
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
                    Algorithm which will cipher our Message.
                    <Link
                      target="_blank"
                      href="https://github.com/brix/crypto-js/blob/develop/docs/QuickStartGuide.wiki#Ciphers"
                    >
                      Here are the details about each one.
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
                caption="Cipher seed, it will be used in encryption and decryption."
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

            <Tabs>
              <TabList>
                <Tab>Encrypt</Tab>
                <Tab>Decrypt</Tab>
              </TabList>
              <TabPanel>
                <EncryptionPanel
                  secretKey={this.state.secretKey}
                  onSuccess={this.onSuccessEncryption}
                  onError={this.onErrorEncryption}
                  encryptMethod={cipher.encrypt}
                />
              </TabPanel>
              <TabPanel>
                <EncryptionPanel
                  secretKey={this.state.secretKey}
                  onSuccess={this.onSuccessEncryption}
                  onError={this.onErrorEncryption}
                  encryptMethod={cipher.decrypt}
                />
              </TabPanel>
            </Tabs>
            <EncryptionResult message={result.message} status={result.status} />
          </Box>
        </ErrorBoundary>
      </ThemeProvider>
    );
  }
}

export default App;
