module.exports = function (sequelize, Sequelize) {
  const Tag = sequelize.define('Tag', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    classMethods: {
      associate(models) {
        Tag.belongsTo(models.Rice);
      }
    },
  });

  return Tag;
};

