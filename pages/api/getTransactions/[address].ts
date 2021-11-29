import { withSessionRoute } from "../../../lib/withSession";
import { trimAccount } from "../../../utils/helpers";
import { Category } from "../../../types";
import { ethers } from "ethers";
import { getCategoriesFromDB } from "../../../utils/backendFunctions";

export default withSessionRoute(async function handler(req, res) {
  const account = req.query.address;

  const etherscanResponse = await fetch(
    `https://api.etherscan.io/api?module=account&action=txlist&address=${account}&sort=desc&apiKey=${process.env.ETHERSCAN_API_KEY}`
  );
  const data = await etherscanResponse.json();
  const txList = data.result;

  if (txList.length === 0) {
    return res.status(400).json({
      status: 0,
      message: `No transactions found for ${trimAccount(account as string)}`,
    });
  }

  const categories = await getCategoriesFromDB(account as string);

  const transactions = transactionsToTable(
    account as string,
    txList,
    categories
  );

  return res.status(200).json({ status: 1, transactions });
});

export const transactionsToTable = (
  account: string,
  transactions: any[],
  categories: Category[]
) => {
  const monthlyTotal = [];

  const txList = transactions
    .map((tx, i) => {
      const valueAsBigNumber = ethers.BigNumber.from(tx.value);
      if (valueAsBigNumber.gt(0) && tx.to) {
        getMonthDataFromTimestamp(account, valueAsBigNumber, tx, monthlyTotal);

        return {
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: ethers.utils.formatEther(valueAsBigNumber),
          category: categories.find((category) => category.hash === tx.hash),
        };
      }
    })
    .filter((tx) => tx);

  return { txList, monthlyTotal };
};

// Internal

const getMonthDataFromTimestamp = (account, value, tx, monthlyTotal) => {
  let dateObj = new Date(tx.timeStamp * 1000);
  let month = dateObj.toLocaleString("en-us", {
    month: "long",
    year: "numeric",
  });

  const isIncome = tx.to.toLowerCase() === account.toLowerCase();

  const monthInArray = monthlyTotal.find(
    (_month: any) => _month.name === month
  );

  if (!monthInArray) {
    monthlyTotal.push({
      name: month,
      in: isIncome ? value : ethers.BigNumber.from(0),
      out: isIncome ? ethers.BigNumber.from(0) : value,
    });
  } else {
    const monthIndex = monthlyTotal.findIndex(
      (_month) => _month.name === monthInArray.name
    );

    monthlyTotal[monthIndex] = {
      ...monthInArray,
      in: isIncome ? monthInArray.in.add(value) : monthInArray.in,
      out: isIncome ? monthInArray.out : monthInArray.out.add(value),
    };
  }
};
