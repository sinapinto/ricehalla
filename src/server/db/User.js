module.exports = function user(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        min: 2,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    emailHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    about: {
      type: DataTypes.TEXT,
    },
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Rice, {
          foreignKey: 'userId',
          onDelete: 'cascade',
        });
        User.belongsToMany(models.Rice, {
          as: 'LikedRice',
          through: 'RiceLikedByUser',
          foreignKey: 'userId',
          onDelete: 'cascade',
        });
      },
    },
    instanceMethods: {
      toJSON() {
        const values = this.get();
        delete values.passwordHash;
        delete values.updatedAt;
        delete values.deletedAt;
        return values;
      },
    },
  });

  return User;
};
