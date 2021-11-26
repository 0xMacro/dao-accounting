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
      <Box
        py={{ base: 6, sm: 10 }}
        px={{ base: 2, sm: 10 }}
        bg="gray.700"
        w="full"
      >
        {children}
      </Box>
    </>
  );
}
