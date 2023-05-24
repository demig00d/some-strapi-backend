export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'default'),
      user: env('DATABASE_USERNAME', 'default'),
      password: env('DATABASE_PASSWORD', 'default'),
      ssl: env.bool('DATABASE_SSL', false)
    }
  }
});
