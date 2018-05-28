import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    selected: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    options: [],
  };

  onChangeOption = ({ target: { value } }) => this.props.onChange(value);

  render() {
    const { options, selected, ...rest } = this.props;
    return (
      <select {...rest} onChange={this.onChangeOption} value={selected}>
        {options.map(text => <option key={text}>{text}</option>)}
      </select>
    );
  }
}

export default Select;
