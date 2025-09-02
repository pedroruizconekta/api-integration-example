import React from "react";
import "./style.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Header";
import Store from "./components/Store";

const theme = extendTheme({
  fonts: {
    heading: "Montserrat, sans-serif",
    body: "Montserrat, sans-serif",
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Store />} />
        </Routes>
      </CartProvider>
    </ChakraProvider>
  );
}
