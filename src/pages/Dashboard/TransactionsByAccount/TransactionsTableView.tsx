import React, { useMemo } from "react";
import CustomTable from "components/Table/CustomTable";
import columns from "./columnData";
import { Transaction } from "types";

type TransactionTableProps = {
  transactions: (Transaction | undefined)[];
};

const TransactionsTableView = ({ transactions }: TransactionTableProps) => {
  const memoizedColumns = useMemo(columns, []);
  const memoizedTransactions = useMemo(() => transactions, []);

  return <CustomTable columns={memoizedColumns} data={memoizedTransactions} />;
};

export default TransactionsTableView;
