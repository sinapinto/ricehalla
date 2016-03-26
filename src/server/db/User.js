module.exports = function (sequelize, Sequelize) {
  const User = sequelize.define('User', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING,
      validate: {
        min: 2
      },
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    passwordHash: {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'password_hash',
    },
    about: {
      type: Sequelize.TEXT,
    },
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Rice);
      }
    },
  });

  return User;
};
