import { useState } from "react";
import Loading from "components/Loading";
import { Input } from "@chakra-ui/react";

const Category = ({ value }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryName, setCategoryName] = useState(value?.name);

  const handleChangeCategory = (e: any) => {
    setCategoryName(e.target.value);
  };

  const handleSaveCategory = async () => {
    const category = categoryName?.trim();
    if (category && category !== value?.name) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <Loading align="left" size="lg" isLoading={isLoading}>
      <Input
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
