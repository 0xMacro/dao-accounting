import React from "react";
import { TransactionResponse } from "@ethersproject/abstract-provider";

type TransactionsByAccountProps = {
  transactions: TransactionResponse[];
};

const TransactionsByAccount = ({
  transactions,
}: TransactionsByAccountProps) => {
  return <div>{transactions.map((tx) => tx.hash)}</div>;
};

export default TransactionsByAccount;
