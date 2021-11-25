import { prisma } from "../../../db";

export default async function handler(req, res) {
  const address = req.query.address;
  const dbResponse = await prisma.users.findFirst({
    where: {
      address,
    },
    select: {
      nonce: true,
    },
  });

  const { nonce } = dbResponse;
  res.status(200).json({ nonce });
}
