module.exports = function rice(sequelize, DataTypes) {
  const Rice = sequelize.define('Rice', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    files: {
      type: DataTypes.TEXT,
    },
    scrot: {
      type: DataTypes.STRING,
    },
  }, {
    classMethods: {
      associate(models) {
        Rice.belongsTo(models.User, {
          foreignKey: {
            name: 'userId',
            allowNull: false,
          },
        });
        Rice.belongsToMany(models.Tag, {
          through: {
            model: models.RiceTag,
            unique: false,
          },
          foreignKey: {
            name: 'riceId',
            allowNull: true,
          },
          constraints: false,
        });
      },
    },
    instanceMethods: {
      toJSON() {
        const values = this.get();
        delete values.deletedAt;
        return values;
      },
    },
  });

  return Rice;
};
