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
  const limit = req.query.limit;

  fs.readFile('./data/user.json', (err, data) => {
    let users = JSON.parse(data);

    if (limit) {
      users = users.slice(0, Number(limit));
    }

    res.status(200).send({
      success: true,
      message: 'Success',
      data: users,
    });
  });
};

module.exports.saveUser = async (req, res) => {
  const user = req.body;

  const properties = ['id', 'name', 'gender', 'contact', 'address', 'photoURL'];
  const missingProperties = [];
  properties.forEach((property) => {
    if (!user[property]) {
      missingProperties.push(property);
    }
  });

  if (missingProperties.length) {
    res.status(400).send({
      success: false,
      message: `Missing properties: ${missingProperties.join(', ')}`,
    });
    return;
  }

  const readUserFile = new Promise((resolve, reject) => {
    fs.readFile('./data/user.json', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

  const data = await readUserFile;
  const users = JSON.parse(data);
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
  const uid = newData.id;

  if (!uid) {
    res.status(400).send({
      success: false,
      message: `id is missing`,
    });
    return;
  }

  if (typeof uid !== 'string') {
    res.status(400).send({
      success: false,
      message: `id must be a string`,
    });
    return;
  }

  const readUserFile = new Promise((resolve, reject) => {
    fs.readFile('./data/user.json', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

  const data = await readUserFile;
  const users = JSON.parse(data);

  const user = users.find((user) => user.id === uid);
  const userIndex = users.findIndex((user) => user.id === uid);

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

module.exports.updateUsers = async (req, res) => {
  const newData = req.body;

  const readUserFile = new Promise((resolve, reject) => {
    fs.readFile('./data/user.json', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

  const data = await readUserFile;
  const users = JSON.parse(data);

  newData.forEach((u) => {
    const uid = u.id;

    if (!uid) {
      res.status(400).send({
        success: false,
        message: `id is missing`,
      });
      return;
    }

    if (typeof uid !== 'string') {
      res.status(400).send({
        success: false,
        message: `id must be a string`,
      });
      return;
    }
  });

  newData.forEach((u) => {
    const uid = u.id;

    const user = users.find((user) => user.id === uid);
    const userIndex = users.findIndex((user) => user.id === uid);

    if (!user) {
      res.status(400).send({
        success: false,
        message: `User not found with id: ${uid}`,
      });
      return;
    }

    for (const key in u) {
      user[key] = u[key];
    }

    users[userIndex] = user;
  });

  fs.writeFile('./data/user.json', JSON.stringify(users), (err) => {
    res.status(200).send({
      success: true,
      message: 'Users updated successfully',
    });
  });
};

module.exports.deleteUser = async (req, res) => {
  const id = req.body.id;

  if (!id) {
    res.status(400).send({
      success: false,
      message: `id is missing`,
    });
    return;
  }

  if (typeof id !== 'string') {
    res.status(400).send({
      success: false,
      message: `id must be a string`,
    });
    return;
  }

  const readUserFile = new Promise((resolve, reject) => {
    fs.readFile('./data/user.json', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

  const data = await readUserFile;
  const users = JSON.parse(data);

  const userIndex = users.findIndex((user) => user.id === id);

  users.splice(userIndex, 1);

  fs.writeFile('./data/user.json', JSON.stringify(users), (err) => {
    res.status(200).send({
      success: true,
      message: 'User deleted successfully',
    });
  });
};
