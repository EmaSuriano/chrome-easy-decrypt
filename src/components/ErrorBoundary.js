import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'mineral-ui';

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    error: null,
  };

  componentDidCatch(error) {
    this.setState({
      error,
    });
  }

  render() {
    return this.state.error ? (
      <Box>
        <Text component="h2">Oh-no! Something went wrong</Text>
        <Text component="p" variant="danger">
          {this.state.error.toString()}
        </Text>
      </Box>
    ) : (
      this.props.children
    );
  }
}
