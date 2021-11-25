import { ethers } from "ethers";
import { prisma } from "../../../config/db";
import { withSessionRoute } from "../../../lib/withSession";

export default withSessionRoute(async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ status: 0, error: "Method not supported" });
  }

  const { account, sig, nonce } = req.body;
  const actualNonce = await getNonce(account);

  // Validate nonce and signature
  if (nonce !== String(actualNonce)) {
    return res.status(400).json({ isValid: false, reason: "Bad nonce" });
  }

  try {
    const signer = ethers.utils.verifyMessage(
      `dao_accounting:${actualNonce || 0}`,
      sig
    );

    if (!signer || signer !== account) {
      return res
        .status(400)
        .json({ isValid: false, reason: "Invalid signature" });
    }
  } catch (err) {
    console.error("signInWithSignature error", err);
  }

  //Upsert user and set session variables
  createOrUpdateUser(account);

  // req.session.connectedAddress = req.body.account;
  req.session.connectedAddress = req.body.account;
  await req.session.save();
  res.status(200).json({ status: 1 });
});

const getNonce = async (address: string) => {
  const dbResponse = await prisma.users.findFirst({
    where: {
      address,
    },
    select: {
      nonce: true,
    },
  });

  const nonce = dbResponse?.nonce;
  return nonce;
};

const createOrUpdateUser = async (address: string) => {
  const nonce = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) + 1;
  const user = await prisma.users.upsert({
    where: { address },
    update: {
      nonce,
    },
    create: {
      address,
      nonce,
    },
  });
  return user;
};
