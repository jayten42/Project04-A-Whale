const { Op } = require('sequelize');
const { Bucket, Detail, Achieve } = require('../../models');

exports.getPresets = async (keyword) => {
  const results = await Bucket.findAll({
    attributes: ['no', 'title', 'description', 'refCount'],
    where: {
      title: {
        [Op.like]: `%${keyword}%`,
      },
    },
    include: [
      {
        model: Detail,
        attributes: ['title', 'dueDate'],
      },
    ],
  });

  return results;
};

exports.create = async (title, description, userNo) => {
  const results = await Bucket.create({
    title,
    description,
    bucketStatus: 'O',
    userNo,
  });

  return results;
};

exports.selectBuckets = async (userNo) => {
  const results = await Bucket.findAll({ raw: true, where: { userNo } });

  return results;
};

exports.updateBucketStatus = async (no, status) => {
  const results = await Bucket.update({ status }, { where: { no } });

  return results[0];
};

exports.updateBucketTitleDesc = async (no, title, description) => {
  const results = await Bucket.update({ title, description }, { where: { no } });

  return results[0];
};

exports.selectBucketDetails = async (bucketNo) => {
  const results = await Detail.findAll({ raw: true, where: { bucketNo } });

  return results;
};
