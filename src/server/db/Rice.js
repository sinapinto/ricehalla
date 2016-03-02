import Sequelize from 'sequelize';
import sequelize from './sequelize';
import User from './User';

const Rice = sequelize.define('rice', {
  title: {
    type: Sequelize.TEXT,
  },
});

Rice.belongsTo(User);

export default Rice;
