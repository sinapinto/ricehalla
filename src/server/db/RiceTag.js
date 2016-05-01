module.exports = function riceTag(sequelize, DataTypes) {
  const RiceTag = sequelize.define('RiceTag', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'RiceTag',
    },
    riceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'RiceTag',
    },
  });

  return RiceTag;
};
