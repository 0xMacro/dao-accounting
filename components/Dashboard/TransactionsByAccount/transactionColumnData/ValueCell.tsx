import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Text, Flex } from "@chakra-ui/react";

type ValueProps = {
  value: string;
  from: string;
  inputAccount: string;
};

const ValueCell = ({ value, from, inputAccount }: ValueProps) => {
  return (
    <Flex align="center">
      <Text>
        {from.toLowerCase() === inputAccount.toLowerCase() ? (
          <ArrowUpIcon boxSize={5} color="red.500" />
        ) : (
          <ArrowDownIcon boxSize={5} color="green.500" />
        )}{" "}
        {value} ETH
      </Text>
    </Flex>
  );
};

export default ValueCell;
