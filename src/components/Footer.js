import React from 'react';
import { Box, Text, Link } from 'mineral-ui';

const Footer = () => (
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
);

export default Footer;
