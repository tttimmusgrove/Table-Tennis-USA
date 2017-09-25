module.exports = {
  production: {
    client: 'mysql',
    connection: {
      host : process.env.PROD_HOST,
      user : process.env.PROD_USER,
      password : process.env.PROD_PASS,
      database : process.env.PROD_DATABASE,
      port: process.env.PROD_PORT,
      socketPath: process.env.PROD_CONNECTION_NAME
    },
    pool: { min: 1, max: 10 }
  }
};
