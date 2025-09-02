import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const PaymentOption = ({
  value,
  label,
  description,
  checked,
  onChange,
  logo,
}) => (
  <Box
    as="label"
    display="flex"
    alignItems="center"
    borderWidth="1px"
    borderRadius="md"
    p={4}
    mb={2}
    cursor="pointer"
    borderColor={checked ? "blue.500" : "gray.200"}
    boxShadow={checked ? "0 0 0 1px blue.500" : "none"}
  >
    <input
      type="radio"
      name="paymentMethod"
      value={value}
      checked={checked}
      onChange={onChange}
      style={{ display: "none" }}
    />
    <img
      src={logo}
      alt={`${label} logo`}
      style={{ width: "30px", marginRight: "10px" }}
    />
    <Box ml={3}>
      <Text fontWeight="bold">{label}</Text>
      <Text fontSize="sm" color="gray.600">
        {description}
      </Text>
    </Box>
  </Box>
);
