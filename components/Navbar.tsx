import React, { useState, useContext } from "react";
import ConnectedAddressContext from "context/ConnectedAddressContext";
import { Flex, Box, Button, Text, useToast } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { trimAccount } from "../utils/helpers";
import { useEffect } from "react";
import { signTransaction } from "utils/auth";

const Navbar = () => {
  const [sessionAddress, setSessionAddress] = useContext(
    ConnectedAddressContext
  );
  const { library, active, account, activateBrowserWallet } = useEthers();
  const [connectedWallet, setConnectedWallet] = useState(account);
  const toast = useToast();

  const handleWalletConnect = async () => {
    activateBrowserWallet();
  };

  const signInWallet = async () => {
    await signTransaction(library!.getSigner(), account!);
    setSessionAddress(account);
    setConnectedWallet(account);
  };

  useEffect(() => {
    if (active && !sessionAddress) {
      signInWallet();
    }
  }, [account, active]);

  const handleSessionOnAccountChange = async () => {
    if (connectedWallet && account !== connectedWallet) {
      await fetch("/api/destroySession");
      setConnectedWallet("");
      setSessionAddress("");

      if (active) {
        toast({
          title: "Make sure to sign the message to log in!",
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
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
          {!sessionAddress && " (Pending signature)"}
        </Text>
      ) : (
        <Button onClick={handleWalletConnect}>Connect Wallet</Button>
      )}
    </Flex>
  );
};

export default Navbar;
