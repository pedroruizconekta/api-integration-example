import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export const CartModal = ({ isOpen, onClose, cartItems, onRemoveFromCart, onButtonClick }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="lg">
    <ModalOverlay />
    <ModalContent borderRadius="20px" p={4} maxW="600px" mx="auto" bg="white">
      <ModalHeader borderBottom="2px solid #8B4513" pb={4} color="#2F1B14">
        🛒 Tu Carrito
      </ModalHeader>
      <ModalCloseButton
        bg="#FF6B35"
        color="white"
        borderRadius="50%"
        _hover={{ bg: "#E55A2B" }}
      />
      <ModalBody>
        {cartItems.length === 0 ? (
          <Box textAlign="center" color="#8B4513" fontStyle="italic" p={4}>
            <Text fontSize="lg">Tu carrito está vacío</Text>
            <Text>¡Agrega algunos deliciosos cafés colombianos!</Text>
          </Box>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <Box
                key={index}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                mb={4}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  boxSize="50px"
                  borderRadius="full"
                  mr={4}
                />
                <Box flex="1">
                  <Heading size="md" color="#2F1B14">
                    {item.name}
                  </Heading>
                  <Text color="#8B4513">
                    Precio: ${item.price.toFixed(2)} MXN
                  </Text>
                  <Text>Cantidad: {item.quantity}</Text>
                </Box>
                <Button
                  mt={2}
                  colorScheme="red"
                  onClick={() => onRemoveFromCart(item.id)}
                >
                  Eliminar
                </Button>
              </Box>
            ))}
            <Box textAlign="center" mt={4}>
              <Button
                bg="linear-gradient(45deg, #2F1B14, #8B4513)"
                color="white"
                borderRadius="50px"
                px={8}
                py={4}
                fontSize="lg"
                fontWeight="bold"
                _hover={{ bg: "linear-gradient(45deg, #8B4513, #D2691E)" }}
                onClick={onButtonClick}
              >
                🇨🇴 Comprar Café Colombiano
              </Button>
            </Box>
          </>
        )}
      </ModalBody>
    </ModalContent>
  </Modal>
);
