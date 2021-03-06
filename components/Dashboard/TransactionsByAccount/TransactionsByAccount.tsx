import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Transaction } from "types";
import { Flex, Text } from "@chakra-ui/react";
import TransactionsTableView from "./TransactionsTableView";
import TransactionsChartView from "./TransactionsChartView";

type TransactionsByAccountProps = {
  transactions: (Transaction | undefined)[];
  monthlyTotal: any;
  inputAccount: string;
};

const TransactionsByAccount = ({
  transactions,
  monthlyTotal,
  inputAccount,
}: TransactionsByAccountProps) => {
  return (
    <Tabs isLazy align="center" mt={10} mx="auto" justify="center" w="100%">
      <TabList>
        <Tab>Table</Tab>
        <Tab>Chart</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TransactionsTableView
            inputAccount={inputAccount}
            transactions={transactions}
          />
        </TabPanel>
        <TabPanel>
          <TransactionsChartView monthlyTotal={monthlyTotal} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TransactionsByAccount;
