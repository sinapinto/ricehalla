module.exports = function riceTag(sequelize, DataTypes) {
  const RiceTag = sequelize.define('RiceTag', {
    id: {
      type: DataTypes.INTEGER,
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
  }, {
    instanceMethods: {
      toJSON() {
        const values = this.get();
        delete values.updatedAt;
        delete values.deletedAt;
        return values;
      },
    },
  });

  return RiceTag;
};
