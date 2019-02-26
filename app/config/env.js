const env = {
  dev: {
    appPort: 3000,
    database: 'swapabook',
    username: 'root',
    password: 'root',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  prod: {
    appPort: 80,
    database: 'heroku_684809c9a95a506',
    username: 'b0c33f114586b4',
    password: '64591451',
    host: 'us-cdbr-iron-east-03.cleardb.net',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};

module.exports = (() => {
  const environment = process.env.NODE_ENV;
  console.log('HDV environment:', environment);
  if (environment === 'prod') {
    console.info(`Using configuration file for the environment ${environment}`);
    return env.prod;
  } else {
    console.info(`Using configuration file for the environment ${environment}`);
    return env.dev;
  }
})();
