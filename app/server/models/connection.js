const mongoose = require('mongoose');

(async function main() {
  await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`);
})();

module.exports = mongoose;