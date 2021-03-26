'use strict';
const { constants } = require('../util');
const { Tag } = require('../models');

module.exports = {
  Get: async () => {
    try {
      const data = await Tag.find();
      return JSON.parse(JSON.stringify(data));
    } catch (ex) {
      console.log('ex:', ex);
    }
  },
  Post: async data => {
    try {
      const tag = new Tag({ ...data });
      tag.save(err => {
        if (err)
          throw new Error(constants.validErrorGenerate('Tag', 'name', err));
      });
      return constants.saveSuccess('Tag');
    } catch (ex) {
      console.log('ex:', ex);
    }
  },
  Put: async (id_tag, data) => {
    Tag.findByIdAndUpdate(id_tag, { $set: data }, err => {
      if (err)
        throw new Error(constants.validErrorGenerate('Tag', 'name', err));
    });
    return constants.updateSuccess('Tag');
  },
  Delete: async id_tag => {
    Tag.findByIdAndDelete(id_tag, err => {
      if (err)
        throw new Error(constants.validErrorGenerate('Tag', 'name', err));
    });
    return constants.removeSuccess('Tag');
  }
};
