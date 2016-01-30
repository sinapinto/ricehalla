export default function(req, res) {
  setTimeout(() => res.status(200).send({ response: 420 }), 400);
}
