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

module.exports.getAllUser = (req, res) => {
  fs.readFile('./data/user.json', (err, data) => {
    res.status(200).send({
      success: true,
      message: 'Success',
      data: JSON.parse(data),
    });
  });
};

module.exports.saveUser = async (req, res) => {
  const user = req.body;

  const readUserFile = new Promise((resolve, reject) => {
    fs.readFile('./data/user.json', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

  const data = await readUserFile;
  const users = JSON.parse(data);
  user.id = users.length + 1;
  users.push(user);

  fs.writeFile('./data/user.json', JSON.stringify(users), (err) => {
    res.status(200).send({
      success: true,
      message: 'User saved successfully',
    });
  });
};

module.exports.updateAUser = async (req, res) => {
  const newData = req.body;

  const readUserFile = new Promise((resolve, reject) => {
    fs.readFile('./data/user.json', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

  const data = await readUserFile;
  const users = JSON.parse(data);

  const user = users.find((user) => user.id === newData.id);
  const userIndex = users.findIndex((user) => user.id === newData.id);

  for (const key in newData) {
    user[key] = newData[key];
  }

  users[userIndex] = user;

  fs.writeFile('./data/user.json', JSON.stringify(users), (err) => {
    res.status(200).send({
      success: true,
      message: 'User updated successfully',
    });
  });
};
