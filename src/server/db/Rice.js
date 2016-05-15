module.exports = function rice(sequelize, DataTypes) {
  const Rice = sequelize.define('Rice', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
            type: DataTypes.INTEGER,
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
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          constraints: false,
        });
        Rice.belongsToMany(models.User, {
          as: 'Liker',
          through: 'RiceLikedByUser',
          foreignKey: 'riceId',
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
