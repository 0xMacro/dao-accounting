import React, { ChangeEvent, ChangeEventHandler } from "react";
import { Button, InputGroup, InputRightElement, Input } from "@chakra-ui/react";

type SearchBarProps = {
  inputAccount: string;
  setInputAccount: React.Dispatch<React.SetStateAction<string>>;
  searchForTransactions: () => void;
};

const SearchBar = ({
  inputAccount,
  setInputAccount,
  searchForTransactions,
}: SearchBarProps) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setInputAccount(e.target.value);
  };

  return (
    <div>
      <InputGroup
        m="auto"
        size="md"
        width={{ base: "100%", md: "75%", lg: "50%" }}
      >
        <Input
          value={inputAccount}
          onChange={handleInputChange}
          placeholder="Search address..."
        />
        <InputRightElement width="5rem">
          <Button onClick={searchForTransactions}>Search</Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
