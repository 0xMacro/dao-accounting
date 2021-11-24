import React from "react";
import { Transaction } from "types";
import { Flex, Text } from "@chakra-ui/react";
import TransactionsTableView from "./TransactionsTableView";

type TransactionsByAccountProps = {
  transactions: (Transaction | undefined)[];
  inputAccount: string;
};

const TransactionsByAccount = ({
  transactions,
  inputAccount,
}: TransactionsByAccountProps) => {
  return (
    <Flex mt={10} justify="center">
      <TransactionsTableView
        inputAccount={inputAccount}
        transactions={transactions}
      />
    </Flex>
  );
};

export default TransactionsByAccount;
