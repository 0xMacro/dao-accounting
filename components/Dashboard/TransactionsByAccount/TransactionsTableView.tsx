import React, { useMemo } from "react";
import CustomTable from "components/CustomTable";
import columns from "./columnData";
import { Transaction } from "types";

type TransactionTableProps = {
  transactions: (Transaction | undefined)[];
};

const TransactionsTableView = ({ transactions }: TransactionTableProps) => {
  const memoizedColumns = useMemo(columns, []);
  const memoizedTransactions = useMemo(() => transactions, []);

  const getRowStyles = (row: any) => {
    let style = { background: "#E53E3E" };
    if (row.values.to === "This address") {
      style = { background: "#2F855A" };
    }
    return style;
  };

  return (
    <CustomTable
      columns={memoizedColumns}
      data={memoizedTransactions}
      getRowStyles={getRowStyles}
    />
  );
};

export default TransactionsTableView;
