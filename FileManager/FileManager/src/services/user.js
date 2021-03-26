'use strict';
const { constants, redisUtils, logger, auth } = require('../util');
const { User } = require('../models');

module.exports = {
  signUp: async ({
    username,
    email,
    password: pwd,
    firstName,
    secondName,
    firstSurName,
    secondSurName
  }) => {
    if (!username || !email || !pwd)
      throw new Error('The fields name, email and password is required');

    const data = await User.findOne({ where: { email } });
    if (data) throw new Error('This user already exists');

    return await User.create({
      username,
      email,
      password: pwd,
      firstName,
      secondName,
      firstSurName,
      secondSurName
    }).then(data => true);
  },
  login: async (username, password) => {
    try {
      let valid = false;
      const data = await User.findOne({ username }, function (err, user) {
        if (err) throw err;
        // test a matching password
        valid = user.comparePassword(password);
      });

      if (valid) {
        const key = data.id;
        if (await redisUtils.existKey(key)) return await redisUtils.getKey(key);
        else return await redisUtils.setKey(key, { id_user: key });
      }
    } catch (ex) {
      logger.error(ex);
    }
  },
  Info: async authorization => {
    const id = auth.verifyJwt(authorization.split(' ')[1]);
    if (id) {
      const data = await User.findOne({ _id: id });
      return `${data.firstName} ${data.firstSurName}`;
    }
  },
  Get: async () => {
    try {
      const data = await User.find({});
      return JSON.parse(JSON.stringify(data));
    } catch (ex) {
      console.log('ex:', ex);
    }
  },
  Put: async (id_user, data) => {
    User.findByIdAndUpdate(id_user, { $set: data }, err => {
      if (err)
        throw new Error(constants.validErrorGenerate('User', 'name', err));
    });
    return constants.updateSuccess('User');
  },
  Delete: async id_user => {
    User.findByIdAndDelete(id_user, err => {
      if (err)
        throw new Error(constants.validErrorGenerate('User', 'name', err));
    });
    return constants.removeSuccess('User');
  }
};
