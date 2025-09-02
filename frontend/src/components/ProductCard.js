import React from "react";
import { Box, Heading, Text, Button, Image } from "@chakra-ui/react";

export const ProductCard = ({ product, onAddToCart }) => (
  <Box
    bg="white"
    borderRadius="8px"
    p={6}
    textAlign="center"
    boxShadow="sm"
    border="1px solid #f0f0f0"
  >
    <Image
      src={product.image}
      alt={product.name}
      borderRadius="4px"
      mb={4}
      h="200px"
      objectFit="cover"
      width="100%"
    />
    <Heading as="h3" size="md" mb={2} color="#2c3e50">
      {product.name}
    </Heading>
    <Text color="#7f8c8d" mb={4}>
      {product.description}
    </Text>
    <Text fontSize="xl" fontWeight="bold" color="#e74c3c" mb={4}>
      ${product.price.toFixed(2)} MXN
    </Text>
    <Button
      bg="#2c3e50"
      color="white"
      width="full"
      _hover={{ bg: "#34495e" }}
      onClick={() => onAddToCart(product)}
    >
      Agregar al carrito
    </Button>
  </Box>
);
