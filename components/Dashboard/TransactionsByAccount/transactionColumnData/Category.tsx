import { useState } from "react";
import Loading from "components/Loading";
import { Input, useToast } from "@chakra-ui/react";
import { trimAccount } from "utils/helpers";
import { useEthers } from "@usedapp/core";

const Category = ({ value, inputAccount, hash }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryName, setCategoryName] = useState(value?.name);
  const toast = useToast();
  const { account } = useEthers();

  const handleChangeCategory = (e: any) => {
    setCategoryName(e.target.value);
  };

  const handleSaveCategory = async () => {
    const category = categoryName?.trim();
    if (category && category !== value?.name) {
      setIsLoading(true);
      try {
        const body = {
          address: inputAccount,
          hash,
          name: categoryName,
        };

        const response = await fetch("/api/saveCategory", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.status) {
          toast({
            title: `Category for ${trimAccount(hash)} updated!`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        } else {
          throw new Error("Saving category failed");
        }
      } catch (e) {
        toast({
          title: "There was an error saving the category.",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Loading align="left" size="lg" isLoading={isLoading}>
      <Input
        readOnly={inputAccount.toLowerCase() !== account?.toLowerCase()}
        w={60}
        value={categoryName}
        onChange={handleChangeCategory}
        onBlur={handleSaveCategory}
        placeholder="Add category..."
      />
    </Loading>
  );
};

export default Category;
