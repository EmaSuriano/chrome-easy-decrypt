import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Encrypters, STATUS_ENCRYPTION } from './utils';
import CryptoJS from 'crypto-js';
import EncryptionPanel from './screens/EncryptionPanel';
import './App.css';
import Select from './shared/select';
import EncryptionResult from './shared/EncryptionResult';
import { ThemeProvider } from 'mineral-ui/themes';
import { Box, Text, TextInput, FormField } from 'mineral-ui';

const EncrypterList = Object.keys(Encrypters);

class App extends Component {
  state = {
    secretKey: '',
    result: {
      message: 'Please encrypt or decrypt your message!',
      status: STATUS_ENCRYPTION.IDLE,
    },
    selectedEncrypter: EncrypterList[0],
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
    const { result, secretKey, selectedEncrypter } = this.state;
    const encrypter = Encrypters[selectedEncrypter];
    return (
      <ThemeProvider>
        <Box marginHorizontal="auto" textAlign="center">
          <header className="App-header">
            <Text element="h1" align="center" color="white">
              Easy Encrypt 🔑
            </Text>
          </header>
          <form>
            <div>
              {/* Cambiar los input de html por los de Mineral UI! */}
              <FormField input={TextInput} label="Encrypted Method" required />
              <Select
                id="encrypted-method"
                options={EncrypterList}
                onChange={value => this.setState({ selectedEncrypter: value })}
                selected={this.state.selectedEncrypter}
              />
            </div>
            <div>
              <label htmlFor="secretKey">Secret key:</label>
              <TextInput
                type="text"
                id="secretKey"
                value={this.state.secretKey}
                onChange={({ target: { id, value } }) =>
                  this.setState({ [id]: value })
                }
                required
              />
            </div>
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
                  encryptMethod={encrypter.encrypt}
                />
              </TabPanel>
              <TabPanel>
                <EncryptionPanel
                  secretKey={this.state.secretKey}
                  onSuccess={this.onSuccessEncryption}
                  onError={this.onErrorEncryption}
                  encryptMethod={encrypter.decrypt}
                />
              </TabPanel>
            </Tabs>
          </form>
          <EncryptionResult message={result.message} status={result.status} />
        </Box>
      </ThemeProvider>
    );
  }
}

export default App;
