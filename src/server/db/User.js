/* eslint-disable new-cap */
import Sequelize from 'sequelize';
import sequelize from './sequelize';

const User = sequelize.define('user', {
  username: {
    allowNull: false,
    type: Sequelize.STRING(50),
  },
  email: {
    type: Sequelize.STRING(100),
  },
  passwordHash: {
    type: Sequelize.STRING(75),
    field: 'password_hash',
  },
  about: {
    type: Sequelize.TEXT,
  },
});

export default User;
