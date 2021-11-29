import { getCategoriesFromDB } from "../../../utils/backendFunctions";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(400).json({ status: 0, error: "Method not supported" });
  }

  const queriedAddress = req.query.address;

  const categories = await getCategoriesFromDB(queriedAddress);

  return res.status(200).json({ status: 1, categories });
}
