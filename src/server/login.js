const ERROR_CHANCE = 0.5;

const login = {
  username: 'test',
  password: 'pass123',
};


function validateInfo() {
  // if () {
  //   return battles;
  // }
  return {
    message: 'oh no! an error!',
  };
}

export default function (req, res) {
  setTimeout(() => res.status(200).send(validateInfo()), 1000);
}
