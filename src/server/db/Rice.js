module.exports = function rice(sequelize, Sequelize) {
  const Rice = sequelize.define('Rice', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT,
    },
    uid: {
      type: Sequelize.UUID,
    },
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    likes: {
      type: Sequelize.INTEGER,
    },
    url: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true
      },
    },
    file: {
      type: Sequelize.TEXT,
    },
  }, {
    classMethods: {
      associate(models) {
        Rice.belongsTo(models.User, {
          foreignKey: 'uid',
          allowNull: false,
        });
      },
    },
    instanceMethods: {
      toJSON() {
        const values = this.get();
        delete values.created_at;
        delete values.updated_at;
        delete values.deleted_at;
        return values;
      },
    },
  });

  return Rice;
};
