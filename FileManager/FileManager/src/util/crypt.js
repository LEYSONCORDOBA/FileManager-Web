const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

/**Generate Base64 and SET on Redis with time to expire */
const crypt = {
  hash: key => {
    try {
      return bcrypt.hashSync(key, salt);
    } catch (e) {
      console.log(e);
    }
  },
  encryptTokenBase64Exp: payload => {
    if (!payload) return;
    let buff = new Buffer(payload);
    return buff.toString('base64');
  },

  /**Generate Base64 and SET on Redis with time to expire */
  decryptTokenBase64: data => {
    if (!data) return;
    let buff = new Buffer(data, 'base64');
    return buff.toString('ascii');
  },
  compareHash: (requestPassword, savedPassword) =>
    bcrypt.compareSync(requestPassword, savedPassword)
};

module.exports = crypt;
