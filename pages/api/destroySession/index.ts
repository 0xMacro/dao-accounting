import { withSessionRoute } from "../../../lib/withSession";

export default withSessionRoute(async function handler(req, res) {
  req.session.destroy();
  return res.status(200).json({ status: 1 });
});
