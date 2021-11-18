import React from "react";
import { Button, Flex, Input } from "@chakra-ui/react";

type SearchBarProps = {
  inputAccount: string;
  setInputAccount: React.Dispatch<React.SetStateAction<string>>;
  searchForTransactions: (_account: string) => void;
};

const SearchBar = ({
  inputAccount,
  setInputAccount,
  searchForTransactions,
}: SearchBarProps) => {
  const handleInputChange = (e: any) => {
    setInputAccount(e.target.value);
  };

  const handleSearchClick = () => {
    searchForTransactions(inputAccount);
  };

  return (
    <Flex m="auto" size="md" width={{ base: "100%", md: "75%", lg: "50%" }}>
      <Input
        value={inputAccount}
        onChange={handleInputChange}
        placeholder="Search address..."
      />
      <Button ml={3} onClick={handleSearchClick}>
        Search
      </Button>
    </Flex>
  );
};

export default SearchBar;
