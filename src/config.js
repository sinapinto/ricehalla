export default {
  jwt: {
    secretOrKey: 'SECRET (HMAC) OR PRIVATE KEY (RSA and ECDSA)',
    options: {
      algorithm: 'HS256',
      expiresIn: '1d',
    }
  },
  db: {
    database: 'ricehalla',
    username: 'sina',
    password: null,
    config: {
      dialect: 'sqlite',
      storage: './db.development.sqlite',
      pool: {
        max: 20,
        min: 0,
        idle: 5000,
      },
      define: {
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        paranoid: true,
      },
      logging: false
    }
  },
};
