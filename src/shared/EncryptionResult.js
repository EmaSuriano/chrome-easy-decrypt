import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { STATUS_ENCRYPTION } from '../utils';
import Button from 'mineral-ui/Button';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Notification } from 'react-notification';

export class EncryptionResult extends Component {
  static propTypes = {
    message: PropTypes.string,
    status: PropTypes.string,
  };

  state = {
    copied: false,
  };

  render() {
    const { message, status } = this.props;
    return (
      <div>
        <p>{message}</p>
        {status === STATUS_ENCRYPTION.SUCCESS && (
          <Fragment>
            <CopyToClipboard
              text={'pepe'}
              onCopy={() => this.setState({ copied: true })}
            >
              <Button primary>Copy to clipboard</Button>
            </CopyToClipboard>
            <Notification
              isActive={this.state.copied}
              onDismiss={() => this.setState({ copied: false })}
              message="Permanent Notification"
              title="Copied to clipboard!"
            />
          </Fragment>
        )}
      </div>
    );
  }
}

export default EncryptionResult;

// const EncryptionResult = ({ message, status }) => {
//   // cambiar de color con el estado!
//   return (
//     <div>
//       <p>{message}</p>
//       {status === STATUS_ENCRYPTION.SUCCESS && (
//         <Fragment>
//           <CopyToClipboard
//             text={'pepe'}
//             onCopy={() => this.setState({ copied: true })}
//           >
//             <Button primary>Copy to clipboard</Button>
//           </CopyToClipboard>
//           <Notification
//             isActive={this.state.copied}
//             onDismiss={() => this.setState({ copied: false })}
//             message="Permanent Notification"
//             title="Copied to clipboard!"
//           />
//         </Fragment>
//       )}
//     </div>
//   );
// };

// EncryptionResult.

// export default EncryptionResult;
