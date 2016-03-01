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
      define: {
        freezeTableName: true
      },
      logging: false
    }
  },
};

