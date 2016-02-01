export default function (req, res) {
  setTimeout(() => res.status(200).send({ response: req.params.id }), 1000);
}
