require('babel-core/register');
const app = require('./app');

// Start the server and wait for connections
const server = app.listen(3000, () => {
  console.log('Server started.');
});

module.exports = server;
