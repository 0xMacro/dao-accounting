import React, {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
} from "react";
import { Button, InputGroup, InputRightElement, Input } from "@chakra-ui/react";

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
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setInputAccount(e.target.value);
  };

  const handleSearchClick: MouseEventHandler<HTMLButtonElement> = () => {
    searchForTransactions(inputAccount);
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
          <Button onClick={handleSearchClick}>Search</Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
