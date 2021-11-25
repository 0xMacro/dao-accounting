import { prisma } from "../../../config/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(400).json({ status: 0, error: "Method not supported" });
  }

  const queriedAddress = req.query.address;

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
    return res.status(200).json({ status: 1, categories: [] });
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

  return res.status(200).json({ status: 1, categories: categoriesResponse });
}
