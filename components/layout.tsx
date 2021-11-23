import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <Box p={{ base: 5, sm: 10 }} bg="gray.700" w="full">
        {children}
      </Box>
    </>
  );
}
