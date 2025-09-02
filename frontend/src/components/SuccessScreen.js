import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export const SuccessScreen = ({ reference, barcodeUrl }) => (
  <Box textAlign="center" p={4}>
    <Heading size="md" mb={4} color="#68c74c">
      REFERENCIA PARA PAGO EN TIENDAS
    </Heading>
    <Box
      mb={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <img src={barcodeUrl} alt="Código de barras" width={250} />
      <Text fontSize="lg" fontWeight="bold" mb={4}>
        {reference}
      </Text>
    </Box>
    <Text mb={2} fontWeight={500}>
      (+ comisión de tienda entre $7 y $13 MXN)
    </Text>
    <Text>1. Dirígete a uno de nuestros Puntos Conekta Efectivo.</Text>
    <Text>2. Menciona que pagarás con Conekta efectivo.</Text>
    <Text>3. Muestra el código de barras o los números que están debajo</Text>
    <Text>4. Realiza tu pago y te enviaremos un correo de confirmación.</Text>
  </Box>
);
