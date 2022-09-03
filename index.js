const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT;

// Listen Server
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
