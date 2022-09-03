const fs = require('fs');

module.exports.getRandomUser = (req, res) => {
  fs.readFile('./data/user.json', (err, data) => {
    const users = JSON.parse(data);

    const randomUser = users[Math.floor(Math.random() * users.length)];

    res.status(200).send({
      success: true,
      message: 'A random user loaded successfully',
      data: randomUser,
    });
  });
};
