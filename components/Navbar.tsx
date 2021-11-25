import React, { useState, useContext } from "react";
import ConnectedAddressContext from "context/ConnectedAddressContext";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { trimAccount } from "../utils/helpers";
import { useEffect } from "react";
import { signTransaction } from "utils/auth";

const Navbar = () => {
  const sessionAddress = useContext(ConnectedAddressContext);
  const { library, active, account, activateBrowserWallet } = useEthers();
  const [connectedWallet, setConnectedWallet] = useState(account);

  const handleWalletConnect = async () => {
    activateBrowserWallet();
  };

  const signInWallet = () => {
    signTransaction(library!.getSigner(), account!);
  };

  useEffect(() => {
    if (active && !sessionAddress) {
      signInWallet();
    }
  }, [account, active]);

  const handleSessionOnAccountChange = async () => {
    console.log("METAMASK CONNECTED:", account);
    console.log("LOCAL STATE:", connectedWallet);
    console.log("SERVER SESSION:", sessionAddress);

    if (connectedWallet && account !== connectedWallet) {
      console.log("destroying session");
      await fetch("/api/destroySession");

      if (active) {
        signInWallet();
      }
    } else {
      setConnectedWallet(account);
    }
  };

  useEffect(() => {
    handleSessionOnAccountChange();
  }, [account]);

  return (
    <Flex
      py={4}
      px={10}
      justify="space-between"
      align="center"
      bg="gray.800"
      boxShadow="lg"
    >
      <Box fontSize="xl" fontWeight="bold">
        DAO Finance
      </Box>

      {account ? (
        <Text fontSize="lg" fontWeight="bold">
          {trimAccount(account)}
        </Text>
      ) : (
        <Button onClick={handleWalletConnect}>Connect Wallet</Button>
      )}
    </Flex>
  );
};

export default Navbar;
