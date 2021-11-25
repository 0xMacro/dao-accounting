import React from "react";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { trimAccount } from "../utils/helpers";
import { useEffect } from "react";
import { signTransaction } from "utils/auth";

const Navbar = () => {
  const { library, active, account, activateBrowserWallet } = useEthers();

  const handleWalletConnect = async () => {
    activateBrowserWallet();
  };

  const signInWallet = () => {
    signTransaction(library!.getSigner(), account!);
  };

  useEffect(() => {
    if (active) {
      signInWallet();
    }
  }, [account, active]);

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
