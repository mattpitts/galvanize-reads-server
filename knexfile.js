module.exports = {
  development: {
    client: 'pg',
    connection: 'postgresql://localhost/galvanize_reads'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
