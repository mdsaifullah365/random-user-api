const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT;
const userRoutes = require('./routes/v1/user.route.js');

// Middlewares
app.use(express.json());

app.use('/user', userRoutes);

// Listen Server
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
