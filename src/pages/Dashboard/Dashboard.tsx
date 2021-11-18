import React, { useEffect, useState, useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ethers } from "ethers";
import { Box } from "@chakra-ui/react";
import SearchBar from "./SearchBar/SearchBar";
import TransactionsByAccount from "./TransactionsByAccount/TransactionsByAccount";
import { useEthers } from "@usedapp/core";

const provider = new ethers.providers.EtherscanProvider();

const Dashboard = () => {
  const [inputAccount, setInputAccount] = useState("");
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const { account } = useEthers();
  const toast = useToast();

  const searchForTransactions = useCallback(
    async (_account: string) => {
      try {
        const txList = await provider.getHistory(_account);
        setTransactions(txList);
      } catch (_e) {
        toast({
          title: "Please enter a valid address.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [toast]
  );

  // If a wallet is connected and there's nothing on the search bar, get the transactions for the connected account

  /**
   * Here we remove the linter's warning about the dependencies because we only want
   * this hook to run once or if "account" changes, we don't care about the other used
   * variables
   */
  useEffect(() => {
    if (account && !inputAccount) {
      searchForTransactions(account);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <Box>
      <SearchBar
        inputAccount={inputAccount}
        setInputAccount={setInputAccount}
        searchForTransactions={searchForTransactions}
      />
      <TransactionsByAccount transactions={transactions} />
    </Box>
  );
};

export default Dashboard;
