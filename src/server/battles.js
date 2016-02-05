const ERROR_CHANCE = 0.5;

const battles = [
  {
    id: 47,
    name: 'rice battle!',
    participants: [12, 32, 38],
    entries: ['entry one', 'two', 'and three'],
  },
  {
    id: 41,
    name: 'rice battle number two!',
    participants: [12, 32, 38],
    entries: ['uno', 'dos', 'tres'],
  },
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
