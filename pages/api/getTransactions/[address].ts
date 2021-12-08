import { withSessionRoute } from "../../../lib/withSession";
import { trimAccount } from "../../../utils/helpers";
import { Category } from "../../../types";
import { ethers } from "ethers";
import { getCategoriesFromDB } from "../../../utils/backendFunctions";
import { prisma } from "../../../config/db";

export default withSessionRoute(async function handler(req, res) {
  const account = req.query.address as string;
  const categories = await getCategoriesFromDB(account);

  const { latestRegisteredBlock, latestBlock } = await getLatestBlocks(account);

  const shouldFetchAgain = await needsToFetchNewTransactions(
    latestBlock,
    latestRegisteredBlock
  );

  let transactions;

  // Checks if should return the cached transactions or fetch again
  if (!shouldFetchAgain) {
    const cachedTransactions = await getCachedTransactions(account);
    transactions = mapCategoriesAndMonthlyDataToCachedTransactions(
      account,
      cachedTransactions,
      categories
    );
  } else {
    const etherscanResponse = await fetch(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${account}&sort=desc&startblock=${
        parseInt(latestRegisteredBlock) + 1 || 0
      }&apiKey=${process.env.ETHERSCAN_API_KEY}`
    );
    const data = await etherscanResponse.json();
    const txList = data.result;

    if (txList.length === 0) {
      return res.status(400).json({
        status: 0,
        message: `No transactions found for ${trimAccount(account)}`,
      });
    }

    transactions = transactionsToTable(account, txList, categories);

    await prisma.transactions.createMany({
      data: transactions.txList,
    });

    await prisma.last_seen_blocks.upsert({
      where: {
        address: account.toLowerCase(),
      },
      update: {
        last_seen_block_number: latestBlock,
      },
      create: {
        address: account.toLowerCase(),
        last_seen_block_number: latestBlock,
      },
    });
  }

  return res.status(200).json({ status: 1, transactions });
});

export const transactionsToTable = (
  account: string,
  transactions: any[],
  categories: Category[]
) => {
  const monthlyTotal = [];

  const txList = transactions
    .map((tx) => {
      const valueAsBigNumber = ethers.BigNumber.from(tx.value);
      if (valueAsBigNumber.gt(0) && tx.to) {
        getMonthDataFromTimestamp(account, valueAsBigNumber, tx, monthlyTotal);

        return {
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: ethers.utils.formatEther(valueAsBigNumber),
          timestamp: tx.timeStamp,
          category: categories.find((category) => category.hash === tx.hash),
        };
      }
    })
    .filter((tx) => tx);

  return { txList, monthlyTotal };
};

// Internal helpers

const needsToFetchNewTransactions = async (
  latestBlock,
  latestRegisteredBlock
) => {
  return (
    !latestRegisteredBlock ||
    !latestBlock ||
    latestBlock !== latestRegisteredBlock
  );
};

const mapCategoriesAndMonthlyDataToCachedTransactions = (
  account,
  transactions,
  categories
) => {
  const monthlyTotal = [];

  const txList = transactions.map((tx) => {
    const valueAsBigNumber = ethers.utils.parseEther(tx.value);
    getMonthDataFromTimestamp(account, valueAsBigNumber, tx, monthlyTotal);

    return {
      ...tx,
      address: tx.address,
      category: categories.find((category) => category.hash === tx.hash),
    };
  });

  return { txList, monthlyTotal };
};

const getLatestBlocks = async (account) => {
  const etherscanResponse = await fetch(
    `https://api.etherscan.io/api?module=account&action=txlist&address=${account}&page=1&offset=1&sort=desc&apiKey=${process.env.ETHERSCAN_API_KEY}`
  );
  const data = await etherscanResponse.json();
  const latestTransaction = data.result;
  const latestBlock = latestTransaction[0]?.blockNumber;

  const latestRegisteredBlock = await getLatestRegisteredBlock(account);

  return { latestRegisteredBlock, latestBlock };
};

const getLatestRegisteredBlock = async (account) => {
  const dbResponse = await prisma.last_seen_blocks.findUnique({
    where: {
      address: account.toLowerCase(),
    },
    select: {
      last_seen_block_number: true,
    },
  });

  return dbResponse?.last_seen_block_number;
};

const getCachedTransactions = async (account) => {
  return await prisma.transactions.findMany({
    orderBy: {
      timestamp: "desc",
    },
    where: {
      OR: [
        {
          from: account.toLowerCase(),
        },
        {
          to: account.toLowerCase(),
        },
      ],
    },
  });
};

const getMonthDataFromTimestamp = (account, value, tx, monthlyTotal) => {
  let dateObj = new Date((tx.timeStamp || tx.timestamp) * 1000);
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
