module.exports = function user(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
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
    passwordHash: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.TEXT,
    },
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Rice, {
          foreignKey: 'userId',
        });
      },
    },
    instanceMethods: {
      toJSON() {
        const values = this.get();
        delete values.id;
        delete values.passwordHash;
        // delete values.createdAt;
        delete values.updatedAt;
        delete values.deletedAt;
        return values;
      },
    },
  });

  return User;
};
