import React, { Component } from 'react';
import { IconVpnKey } from 'mineral-ui-icons';
import { ThemeProvider } from 'mineral-ui/themes';
import { Box, Text, TextInput, FormField, Select, Link } from 'mineral-ui';
import Flex, { FlexItem } from 'mineral-ui/Flex';
import EncryptionPanel from './components/EncryptionPanel';
import { Ciphers, onChangeText } from './utils';
import ErrorBoundary from './components/ErrorBoundary';
import Separator from './components/Separator';
import Footer from './components/Footer';

const cipherList = Object.keys(Ciphers).map(name => ({
  text: name,
  value: name,
}));

class App extends Component {
  state = {
    secretKey: '',
    selectedCipher: cipherList[0].value,
  };

  onChangeSecretKey = onChangeText.bind(this);

  render() {
    const { secretKey, selectedCipher } = this.state;
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
            <Flex justifyContent="center" alignItems="center">
              <FlexItem>
                <Text as="h2" align="center" verticalAlign="bottom">
                  Easy Encrypt
                </Text>
              </FlexItem>
              <FlexItem>
                <IconVpnKey size="2em" verticalAlign="bottom" color="gold" />
              </FlexItem>
            </Flex>
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
                {...(!secretKey && { required: true })}
                caption="Cipher seed, it will be used in the process."
              >
                <TextInput
                  id="secretKey"
                  type="password"
                  value={secretKey}
                  onChange={this.onChangeSecretKey}
                />
              </FormField>
            </Box>
            <EncryptionPanel secretKey={secretKey} cipher={cipher} />
            <Footer />
          </Box>
        </ErrorBoundary>
      </ThemeProvider>
    );
  }
}

export default App;
