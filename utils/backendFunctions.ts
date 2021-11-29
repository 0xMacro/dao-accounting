import { prisma } from "../config/db";

export const getCategoriesFromDB = async (queriedAddress: string) => {
  const userQueryResponse = await prisma.users.upsert({
    where: {
      address: queriedAddress.toLowerCase() as string,
    },
    create: {
      address: queriedAddress.toLowerCase(),
      nonce: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1,
    },
    update: {},
  });

  const id = userQueryResponse?.id;

  if (!id) {
    return [];
  }

  const categoriesResponse = await prisma.categories.findMany({
    where: {
      user_id: id,
    },
    select: {
      name: true,
      hash: true,
    },
  });

  return categoriesResponse;
};
