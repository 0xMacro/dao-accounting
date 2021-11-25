import { withSessionRoute } from "../../../lib/withSession";
import { prisma } from "../../../config/db";

export default withSessionRoute(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ status: 0, error: "Method not supported" });
  }

  const { address, hash, name } = req.body;
  const connectedAddress = req.session.connectedAddress;

  if (address.toLowerCase() !== connectedAddress.toLowerCase()) {
    return res.status(401).json({ status: 0, error: "Unauthorized" });
  }

  const userQueryResponse = await prisma.users.findFirst({
    where: {
      address: address.toLowerCase(),
    },
    select: {
      id: true,
    },
  });

  const userId = userQueryResponse?.id;

  if (!userId) {
    return res.status(400).json({ status: 0, error: "Account doesn't exist" });
  }

  const rowQueryResponse = await prisma.categories.findFirst({
    where: {
      user_id: userId,
      hash: hash.toLowerCase(),
    },
    select: {
      id: true,
    },
  });

  const rowId = rowQueryResponse?.id;

  let category;
  if (rowId) {
    category = await prisma.categories.update({
      where: {
        id: rowId,
      },
      data: {
        name,
      },
    });
  } else {
    category = await prisma.categories.create({
      data: {
        user_id: userId,
        hash: hash.toLowerCase(),
        name,
      },
    });
  }

  return res.status(200).json({ status: 1, category });
});
