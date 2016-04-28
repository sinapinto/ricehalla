module.exports = function user(sequelize, Sequelize) {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT,
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
        User.hasMany(models.Rice, {
          foreignKey: 'userId',
        });
      }
    },
    instanceMethods: {
      toJSON() {
        const values = this.get();
        delete values.id;
        delete values.passwordHash;
        delete values.created_at;
        delete values.updated_at;
        delete values.deleted_at;
        return values;
      },
    },
  });

  return User;
};
