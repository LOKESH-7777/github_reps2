const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Online Book Store</h1><p>Welcome!</p>');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});