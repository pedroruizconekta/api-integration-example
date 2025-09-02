import React, { useContext, useState, useRef } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { CartContext } from "../context/CartContext";
import { coffeeProducts } from "../context/constants";
import { ProductCard } from "./ProductCard";
import { CartModal } from "./CartModal";
import { PaymentOption } from "./PaymentOption";
import { SuccessScreen } from "./SuccessScreen";
import { BNPLSuccessScreen } from "./BNPLSuccessScreen";
import { transformOrderData, createOrder } from "../utils/orderUtils";

const Store = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } =
    useContext(CartContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [paymentMethod, setPaymentMethod] = useState("Efectivo");
  const [shippingData, setShippingData] = useState({
    street1: "",
    postal_code: "",
    country: "MX",
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    reference: "",
    barcodeUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const formButtonRef = useRef();
  const containerRef = useRef();

  const openForm = () => {
    onClose();
    onFormOpen();
  };

  const closeForm = () => {
    onFormClose();
    setOrderSuccess(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData({ ...shippingData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = transformOrderData(
      cartItems,
      formData,
      shippingData,
      paymentMethod
    );

    try {
      const response = await createOrder(orderData);
      console.log("Order created:", response);
      if (paymentMethod === "Efectivo") {
        const { reference, barcode_url } =
          response.charges.data[0].payment_method;
        setPaymentInfo({ reference, barcodeUrl: barcode_url });
      } else {
        const redirectUrl =
          response.charges.data[0].payment_method.redirect_url;
        setTimeout(() => {
          window.location.href = redirectUrl;
        }, 5000);
      }
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error(
        "Error creating order:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="1200px" py={8} ref={containerRef}>
      <Box
        position="fixed"
        top="20px"
        right="20px"
        bg="white"
        p={4}
        borderRadius="25px"
        boxShadow="md"
        border="1px solid #eee"
        zIndex="1000"
        onClick={onOpen}
        cursor="pointer"
      >
        <Text>
          🛒 Carrito{" "}
          <span
            style={{
              background: "#e74c3c",
              color: "white",
              borderRadius: "50%",
              padding: "0.2rem 0.6rem",
              fontSize: "0.8rem",
              marginLeft: "0.5rem",
              fontWeight: "500",
            }}
          >
            {cartItems.length}
          </span>
        </Text>
      </Box>

      <Heading as="h2" size="lg" textAlign="center" mb={12} color="#2c3e50">
        Nuestra Selección de Café
      </Heading>

      <SimpleGrid columns={[1, 2, 3]} spacing={10} mb={12}>
        {coffeeProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </SimpleGrid>

      <CartModal
        isOpen={isOpen}
        onClose={onClose}
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
        onButtonClick={openForm}
      />

      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        size="lg"
        finalFocusRef={formButtonRef}
        portalProps={{ containerRef }}
      >
        <ModalOverlay />
        <ModalContent
          borderRadius="20px"
          p={4}
          maxW="600px"
          mx="auto"
          bg="white"
        >
          <ModalHeader borderBottom="2px solid #8B4513" pb={4} color="#2F1B14">
            Formulario de Compra
          </ModalHeader>
          <ModalCloseButton
            bg="#FF6B35"
            color="white"
            borderRadius="50%"
            _hover={{ bg: "#E55A2B" }}
          />
          <ModalBody>
            {orderSuccess ? (
              paymentMethod === "Efectivo" ? (
                <SuccessScreen
                  reference={paymentInfo.reference}
                  barcodeUrl={paymentInfo.barcodeUrl}
                />
              ) : (
                <BNPLSuccessScreen
                  provider={
                    paymentMethod === "Pago en plazos con Creditea"
                      ? "Creditea"
                      : "Aplazo"
                  }
                />
              )
            ) : (
              <form onSubmit={handleSubmit}>
                <FormControl id="name" isRequired mb={4}>
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="email" isRequired mb={4}>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="phone" isRequired mb={4}>
                  <FormLabel>Teléfono</FormLabel>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl id="street1" isRequired mb={4}>
                  <FormLabel>Calle</FormLabel>
                  <Input
                    name="street1"
                    value={shippingData.street1}
                    onChange={handleShippingChange}
                  />
                </FormControl>
                <FormControl id="postal_code" isRequired mb={4}>
                  <FormLabel>Código Postal</FormLabel>
                  <Input
                    name="postal_code"
                    value={shippingData.postal_code}
                    onChange={handleShippingChange}
                  />
                </FormControl>
                <FormControl as="fieldset" mb={4}>
                  <FormLabel as="legend">Método de Pago</FormLabel>
                  <Box>
                    <PaymentOption
                      value="Efectivo"
                      label="Efectivo"
                      description="Pago en efectivo al recibir."
                      checked={paymentMethod === "Efectivo"}
                      onChange={handlePaymentMethodChange}
                      logo="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlsRIrYdNPvIrYM1gGBo7saYYP7ryQMq5qbQ&s"
                    />
                    <PaymentOption
                      value="Pago en plazos con Creditea"
                      label="Creditea"
                      description="4 quincenas sin interés de $750.00. Sin pago inicial hasta 60 quincenas."
                      checked={paymentMethod === "Pago en plazos con Creditea"}
                      onChange={handlePaymentMethodChange}
                      logo="https://assets.conekta.com/checkout/img/logos/logo-creditea.svg"
                    />
                    <PaymentOption
                      value="Pago en plazos con Aplazo"
                      label="Aplazo"
                      description="Hasta 8 quincenas."
                      checked={paymentMethod === "Pago en plazos con Aplazo"}
                      onChange={handlePaymentMethodChange}
                      logo="https://assets.conekta.com/checkout/img/logos/logo-aplazo.svg"
                    />
                  </Box>
                </FormControl>
                <Button
                  type="submit"
                  bg="linear-gradient(45deg, #2F1B14, #8B4513)"
                  color="white"
                  borderRadius="50px"
                  px={8}
                  py={4}
                  fontSize="lg"
                  fontWeight="bold"
                  _hover={{ bg: "linear-gradient(45deg, #8B4513, #D2691E)" }}
                  isLoading={loading}
                >
                  Enviar
                </Button>
              </form>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Store;
