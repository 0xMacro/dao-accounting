import React from "react";
import { Link } from "@chakra-ui/react";
import { trimAccount } from "utils/helpers";
import { Input } from "@chakra-ui/react";

const AddressCell = ({ value }: any) => {
  return (
    <Link
      textDecoration="underline"
      href={`https://etherscan.io/address/${value}`}
      target="_blank"
    >
      {trimAccount(value)}
    </Link>
  );
};

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
    Cell: () => (
      <Input
        w={60}
        onBlur={() => console.log("mandando")}
        placeholder="Add category..."
      />
    ),
  },
];

export default columns;
