import Sequelize from 'sequelize';
import sequelize from './sequelize';

const User = sequelize.define('user', {
  uuid: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  username: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  passwordHash: {
    allowNull: false,
    type: Sequelize.STRING,
    field: 'password_hash',
  },
  about: {
    type: Sequelize.TEXT,
  },
});

export default User;
