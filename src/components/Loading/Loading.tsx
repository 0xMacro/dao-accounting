import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

type LoadingProps = {
  children: React.ReactNode;
  isLoading: boolean;
};

const Loading = ({ children, isLoading }: LoadingProps) => {
  if (isLoading) {
    return (
      <Box textAlign="center">
        <Spinner size="xl" />
      </Box>
    );
  }
  return <>{children}</>;
};

export default Loading;
