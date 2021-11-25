export type Transaction = {
  hash: string;
  from: string;
  to: string | undefined;
  value: string;
};

export type Category = {
  hash: string;
  name: string;
};
