import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

type LoadingProps = {
  children: React.ReactNode;
  isLoading: boolean;
  size?: string;
  align?: string;
};

const Loading = ({ children, isLoading, size, align }: LoadingProps) => {
  if (isLoading) {
    return (
      <Flex justify={align || "center"} align="center">
        <Spinner size={size || "xl"} />
      </Flex>
    );
  }
  return <>{children}</>;
};

export default Loading;
