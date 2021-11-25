import React, { useMemo } from "react";
import CustomTable from "components/CustomTable";
import columns from "./transactionColumnData";
import { Transaction } from "types";

type TransactionTableProps = {
  transactions: (Transaction | undefined)[];
  inputAccount: string;
};

const TransactionsTableView = ({
  transactions,
  inputAccount,
}: TransactionTableProps) => {
  const memoizedColumns = useMemo(columns, []);
  const memoizedTransactions = useMemo(() => transactions, []);

  return <CustomTable columns={memoizedColumns} data={memoizedTransactions} />;
};

export default TransactionsTableView;
