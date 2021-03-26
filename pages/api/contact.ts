export default function handler(req, res) {
  console.log(req);
  const { email, message, name } = req.body;
  res.status(200).json(req.body);
}
