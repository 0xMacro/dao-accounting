import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DAppProvider } from "@usedapp/core";
import { ChakraProvider } from "@chakra-ui/react";
import config from "./dappConfig";
import theme from "extendTheme";
import "@fontsource/roboto";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);