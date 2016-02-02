const ERROR_CHANCE = 0.5;

const battles = [
];

const error = {
  message: 'oh no! an error!',
};

function getMockData() {
  if (Math.random() > ERROR_CHANCE) {
    return battles;
  }
  return error;
}

export default function (req, res) {
  setTimeout(() => res.status(200).send(getMockData()), 1000);
}
