module.exports = function tag(sequelize, DataTypes) {
  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue('name', val.toLowerCase());
      },
    },
    count: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  }, {
    classMethods: {
      associate(models) {
        Tag.belongsToMany(models.Rice, {
          through: {
            model: models.RiceTag,
            unique: false,
          },
          foreignKey: 'tagId',
        });
      }
    },
    instanceMethods: {
      toJSON() {
        const values = this.get();
        delete values.createdAt;
        delete values.updatedAt;
        delete values.deletedAt;
        return values;
      },
    },
  });

  return Tag;
};
