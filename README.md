# chrome-easy-encrypt

<div align="center">
  <a href="https://chrome.google.com/webstore/detail/pdpinaffkgjneengfdgoohjipndeopcn">
    <img alt="Easy-decrypt-logo" src="./public/key.png" height="100px" />
  </a>
</div>

<div align="center">
  <strong>Easy Encrypt</strong>
</div>

> Open Source Chrome extension to encrypt and decrypt a message in seconds!

- [Link to the store](https://chrome.google.com/webstore/detail/pdpinaffkgjneengfdgoohjipndeopcn)
- [Roadmap](./ROADMAP.md)

## Technical Overview

- React application bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and embedded in a chrome popup.
- The components are based on [`mineral-ui`](http://mineral-ui.com/).
- The process of encryption/decryption is handled by [`crypto-js`](https://github.com/brix/crypto-js).
- **Only client-side, no server communication.**

## Setup

```bash
# install deps
> yarn

# start project
> yarn start

# run lint
> yarn lint
```

## Screenshots

|        Main Page        | Filling Required fields |       Encrypted!        |
| :---------------------: | :---------------------: | :---------------------: |
| ![](./screenshot/1.png) | ![](./screenshot/2.png) | ![](./screenshot/3.png) |

## Contributing

1. Fork it (<https://github.com/EmaSuriano/chrome-easy-decrypt/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## License

MIT © Emanuel Suriano
