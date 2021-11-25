import React from "react";
import { DAppProvider } from "@usedapp/core";
import { ChakraProvider } from "@chakra-ui/react";
import config from "../config/dappConfig";
import theme from "../config/extendTheme";
import "@fontsource/roboto";
import "../styles/globals.css";

export default function DAOFinanceApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </DAppProvider>
  );
}
