import { prisma } from "../../../config/db";

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

  const nonce = dbResponse?.nonce;
  res.status(200).json({ nonce });
}
