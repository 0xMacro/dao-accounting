import React from "react";
import { Transaction } from "types";
import { Flex, Text } from "@chakra-ui/react";
import TransactionsTableView from "./TransactionsTableView";

type TransactionsByAccountProps = {
  transactions: (Transaction | undefined)[];
  noTransactions: boolean;
};

const TransactionsByAccount = ({
  transactions,
  noTransactions,
}: TransactionsByAccountProps) => {
  if (noTransactions) {
    return (
      <Flex textAlign="center" mt={10} justify="center">
        <Text fontSize="lg">No transactions found for this address!</Text>
      </Flex>
    );
  }

  return (
    <Flex mt={10} justify="center">
      <TransactionsTableView transactions={transactions} />
    </Flex>
  );
};

export default TransactionsByAccount;
