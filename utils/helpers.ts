import { ethers } from "ethers";
export const trimAccount = (string: string) => {
  return string.slice(0, 4) + "..." + string.slice(string.length - 4);
};

export const monthlyTotalToNumber = (monthlyTotal: []) => {
  return monthlyTotal.map((month: any) => {
    return {
      ...month,
      in: ethers.utils.formatEther(month.in).slice(0, 7),
      out: "-" + ethers.utils.formatEther(month.out).slice(0, 7),
    };
  });
};
