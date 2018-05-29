import CryptoJS from 'crypto-js';

const isEncrypter = obj => obj.encrypt && obj.decrypt;

const parseEncrypter = ({ encrypt, decrypt }) => ({
  encrypt: (...args) => encrypt(...args).toString(),
  decrypt: (...args) => decrypt(...args).toString(CryptoJS.enc.Utf8),
});

export const Ciphers = Object.entries(CryptoJS)
  .filter(entry => isEncrypter(entry[1]))
  .reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: parseEncrypter(value),
    }),
    {},
  );

export function onChangeText({ target: { id, value } }) {
  this.setState({ [id]: value });
}

export const STATUS_ENCRYPTION = {
  SUCCESS: 'SUCCESS',
  IDLE: 'IDLE',
  ERROR: 'ERROR',
};
