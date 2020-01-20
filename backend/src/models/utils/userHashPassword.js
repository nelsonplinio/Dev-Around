const passwordHash = require('password-hash');
module.exports = {
  generatePasswordHash (password) {
    return passwordHash.generate(password);
  },
  
  validatePassword (password, hash) {
    return passwordHash.verify(password, hash);
  }
}