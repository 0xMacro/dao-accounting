import React, { useState } from "react";
import { Button, Flex, Input } from "@chakra-ui/react";

type SearchBarProps = {
  searchForTransactions: (_account: string) => void;
};

const SearchBar = ({ searchForTransactions }: SearchBarProps) => {
  const [typingAccount, setTypingAccount] = useState("");

  const handleInputChange = (e: any) => {
    setTypingAccount(e.target.value.trim());
  };

  const handleSearchClick = () => {
    searchForTransactions(typingAccount);
  };

  return (
    <Flex m="auto" size="md" width={{ base: "100%", md: "75%", lg: "50%" }}>
      <Input
        value={typingAccount}
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
