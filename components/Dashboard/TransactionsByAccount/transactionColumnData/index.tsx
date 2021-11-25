import React from "react";
import { Link } from "@chakra-ui/react";
import { trimAccount } from "utils/helpers";
import AddressCell from "./AddressCell";
import Category from "./Category";

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
    Cell: ({ value }: any) => `${value} ETH`,
  },
  {
    Header: "Category",
    accessor: "category",
    Cell: ({ value }: any) => <Category value={value} />,
  },
];

export default columns;