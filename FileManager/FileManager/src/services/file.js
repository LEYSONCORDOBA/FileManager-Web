'use strict';
const { auth } = require('../util');
const { File } = require('../models');

var fs = require('fs');

module.exports = {
  Get: async authorization => {
    try {
      const id = auth.verifyJwt(authorization.split(' ')[1]);
      const data = await File.find({ user_id: id });
      return JSON.parse(JSON.stringify(data));
    } catch (ex) {
      console.log('ex:', ex);
    }
  },
  Upload: async ({ newFile, authorization }) => {
    try {
      const nameFile = newFile.name;
      const user_id = auth.verifyJwt(authorization.split(' ')[1]);
      const path = `${__dirname}/files/${user_id}`.replace('/services', '');
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }

      await newFile.mv(`${path}/${nameFile}`);

      const files = await File.create({
        name: nameFile,
        user_id
      });
      return files;
    } catch (e) {
      return false;
    }
  }
};
