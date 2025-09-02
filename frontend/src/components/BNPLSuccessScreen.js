import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const BNPLSuccessScreen = ({ provider }) => (
  <Box
    textAlign="center"
    p={4}
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <img
      src={
        provider === "Creditea"
          ? "https://assets.conekta.com/checkout/img/logos/logo-creditea.svg"
          : "https://assets.conekta.com/checkout/img/logos/logo-aplazo.svg"
      }
      alt={`${provider} logo`}
      style={{ width: "50px", marginBottom: "20px" }}
    />
    <Text fontSize="lg" fontWeight="bold" mb={4}>
      Completa tu pago en {provider} para finalizar tu compra
    </Text>
    <Text>Aquí te avisaremos cuando esté listo.</Text>
  </Box>
);
