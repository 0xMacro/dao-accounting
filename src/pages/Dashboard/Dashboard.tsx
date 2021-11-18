import React, { useState } from "react";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { ethers } from "ethers";
import { Box } from "@chakra-ui/react";
import SearchBar from "./SearchBar/SearchBar";
import TransactionsByAccount from "./TransactionsByAccount/TransactionsByAccount";

const provider = new ethers.providers.EtherscanProvider();

const Dashboard = () => {
  const [inputAccount, setInputAccount] = useState("");
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);

  const searchForTransactions = async () => {
    const txList = await provider.getHistory(inputAccount);
    setTransactions(txList);
  };

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
