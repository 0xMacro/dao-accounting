import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

type LoadingProps = {
  children: React.ReactNode;
  isLoading: boolean;
  size?: string;
  align?: string;
  py?: number;
};

const Loading = ({ children, isLoading, size, align, py }: LoadingProps) => {
  if (isLoading) {
    return (
      <Flex py={py || 1} justify={align || "center"} align="center">
        <Spinner size={size || "xl"} />
      </Flex>
    );
  }
  return <>{children}</>;
};

export default Loading;
