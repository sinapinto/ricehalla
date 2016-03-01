/* eslint-disable new-cap */
import Sequelize from 'sequelize';
import sequelize from './sequelize';

const Rice = sequelize.define('rice', {
  title: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
});

export default Rice;

