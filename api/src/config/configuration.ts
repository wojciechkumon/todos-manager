const getStringEnvOrDefault = (
  envVarName: string,
  defaultValue: string,
): string => {
  const envVar = process.env[envVarName];
  return envVar || defaultValue;
};

export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: getStringEnvOrDefault('JWT_SECRET', 'secret'),
  database: {
    host: getStringEnvOrDefault('DATABASE_HOST', 'localhost'),
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: getStringEnvOrDefault('DATABASE_USER', 'todos-user'),
    password: getStringEnvOrDefault('DATABASE_PASSWORD', 'p4ssw0rd'),
    dbName: getStringEnvOrDefault('DATABASE_NAME', 'todos'),
  },
});
