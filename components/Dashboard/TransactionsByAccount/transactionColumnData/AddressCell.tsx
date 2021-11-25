import { Link } from "@chakra-ui/react";
import { trimAccount } from "utils/helpers";

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

export default AddressCell;
