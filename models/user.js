const db = require('./db');
const bcrypt = require('bcryptjs');


const User = {
  create: async (username, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return db.query('INSERT INTO user1 (username, password) VALUES (?, ?)', [username, hashedPassword]);
  },

  findByUsername: async (username) => {
    return db.query('SELECT id, username, password, level FROM user1 WHERE username = ?', [username]);
  }
  
};

module.exports = User;
