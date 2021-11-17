import React from "react";
import { Flex, Box, Button, Text } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import { trimAccount } from "utils/helpers";

const Navbar = () => {
  const { account, activateBrowserWallet } = useEthers();

  const handleWalletConnect = () => {
    activateBrowserWallet();
  };

  return (
    <Flex py={4} px={10} justify="space-between" align="center" boxShadow="md">
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
