import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box
      textAlign="center"
      mb={16}
      bg="white"
      py={12}
      borderBottom="1px solid #eee"
    >
      <Heading as="h1" size="2xl" mb={2} color="#2c3e50">
        Café Colombiano
      </Heading>
      <Text fontSize="lg" color="#7f8c8d">
        Café Premium de las montañas de Colombia
      </Text>
    </Box>
  );
};

export default Header;
