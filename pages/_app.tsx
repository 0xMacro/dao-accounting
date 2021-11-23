import React from "react";
import { DAppProvider } from "@usedapp/core";
import { ChakraProvider } from "@chakra-ui/react";
import config from "../dappConfig";
import theme from "../extendTheme";
import "@fontsource/roboto";
import "../styles/globals.css";
import Layout from "../components/layout";

export default function DAOFinanceApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </DAppProvider>
  );
}
