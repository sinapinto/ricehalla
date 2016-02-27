/* eslint-disable new-cap */
import Sequelize from 'sequelize';
import sequelize from '../sequelize';

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING(50),
    field: 'username',
  },
  email: {
    type: Sequelize.STRING(100),
    field: 'email',
  },
  passwordHash: {
    type: Sequelize.STRING(75),
    field: 'password_hash',
  },
  sessionToken: {
    type: Sequelize.STRING(75),
    field: 'session_token',
    defaultValue: '',
    allowNull: false,
  },
  about: {
    type: Sequelize.TEXT,
    field: 'about',
  },
});

export default User;
