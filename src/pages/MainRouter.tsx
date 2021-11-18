import React from "react";
import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

const MainRouter = () => {
  return (
    <Router>
      <Box p={10} bg="gray.700" w="full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Box>
    </Router>
  );
};

export default MainRouter;
