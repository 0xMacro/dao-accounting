import React, { useEffect, useState, useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { Transaction } from "types";
import { Box } from "@chakra-ui/react";
import SearchBar from "./SearchBar/SearchBar";
import TransactionsByAccount from "./TransactionsByAccount/TransactionsByAccount";
import { useEthers } from "@usedapp/core";
import Loading from "components/Loading";
import { fixUpTransactionData, trimAccount } from "utils/helpers";

const provider = new ethers.providers.EtherscanProvider();

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [inputAccount, setInputAccount] = useState("");
  const [transactions, setTransactions] = useState<(Transaction | undefined)[]>(
    []
  );
  const { account } = useEthers();
  const toast = useToast();

  const searchForTransactions = useCallback(
    async (_account: string) => {
      setInputAccount(_account);
      setIsLoading(true);
      setTransactions([]);
      try {
        const txList = await provider.getHistory(_account);
        if (txList.length === 0) {
          return toast({
            title: `No transactions found for ${trimAccount(_account)}`,
            status: "info",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }

        const response = await fetch(`/api/getCategories/${_account}`);
        const { categories } = await response.json();

        const cleanTransactions = fixUpTransactionData(txList, categories);

        setTransactions(cleanTransactions);
      } catch (_e) {
        console.log(_e);
        toast({
          title: "Please enter a valid address.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  // If a wallet is connected and there's nothing on the search bar, get the transactions for the connected account
  useEffect(() => {
    if (account && isFirstRender) {
      setIsFirstRender(false);
      searchForTransactions(account);
    }
  }, [account, isFirstRender, searchForTransactions]);

  return (
    <Box m="auto">
      <Loading isLoading={isLoading}>
        <SearchBar searchForTransactions={searchForTransactions} />
        {transactions.length ? (
          <TransactionsByAccount
            inputAccount={inputAccount}
            transactions={transactions}
          />
        ) : null}
      </Loading>
    </Box>
  );
};

export default Dashboard;
