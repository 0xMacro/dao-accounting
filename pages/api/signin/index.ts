import { getSession } from "../../../utils/get-session";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(400).json({ status: 0, error: "Method not supported" });
  }

  const session = await getSession(req, res);
  session.connectedAddress = req.body.account;
  res.status(200).json({ status: 1 });
}
