import React from "react";
import { TransactionResponse } from "@ethersproject/abstract-provider";
import { Flex, Text } from "@chakra-ui/react";

type TransactionsByAccountProps = {
  transactions: TransactionResponse[];
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
      <ul>
        {transactions.map((tx) => (
          <li>{tx.hash}</li>
        ))}
      </ul>
    </Flex>
  );
};

export default TransactionsByAccount;
