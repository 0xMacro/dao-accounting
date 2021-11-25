import React from "react";
import { Link } from "@chakra-ui/react";
import { trimAccount } from "utils/helpers";
import AddressCell from "./AddressCell";
import Category from "./Category";
import ValueCell from "./ValueCell";

const columns = () => [
  {
    Header: "Hash",
    accessor: "hash",
    Cell: ({ value }: any) => (
      <Link
        textDecoration="underline"
        href={`https://etherscan.io/tx/${value}`}
        target="_blank"
      >
        {trimAccount(value)}
      </Link>
    ),
  },
  {
    Header: "From",
    accessor: "from",
    Cell: ({ value }: any) => <AddressCell value={value} />,
  },
  {
    Header: "To",
    accessor: "to",
    Cell: ({ value }: any) => <AddressCell value={value} />,
  },
  {
    Header: "Amount",
    accessor: "value",
    Cell: ({ value, row, extraProps }: any) => (
      <ValueCell
        value={value}
        from={row.original.from}
        inputAccount={extraProps.inputAccount}
      />
    ),
  },
  {
    Header: "Category",
    accessor: "category",
    Cell: ({ value, row, extraProps }: any) => (
      <Category
        value={value}
        inputAccount={extraProps.inputAccount}
        hash={row.original.hash}
      />
    ),
  },
];

export default columns;
