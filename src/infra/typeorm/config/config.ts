require('dotenv').config()

const { 
  DB_USER, 
  DB_PASS, 
  DB_HOST,
  DB_DEV_DB_NAME,
  DB_DEV_DB_PORT,
  DB_TEST_DB_NAME,
  DB_TEST_DB_PORT,
  DB_PROD_DB_NAME,
  DB_PROD_DB_PORT,
  NODE_ENV
} = process.env;

type DB_CONFIG_INFO = {
    username: string;
    password: string;
    database: string;
    host: string;
    port: string;
    dialect: "postgres" | "sqlite" | "mysql2"
}

type ENV = "development" | "test" | "production";

const databaseCredentials: Record<ENV, DB_CONFIG_INFO> = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_DEV_DB_NAME,
    host: DB_HOST,
    port: DB_DEV_DB_PORT,
    dialect: "postgres"
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_TEST_DB_NAME,
    host: DB_HOST,
    port: DB_TEST_DB_PORT,
    dialect: "postgres"
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_PROD_DB_NAME,
    host: DB_HOST,
    port: DB_PROD_DB_PORT,
    dialect: "postgres"
  }
};

const databaseCredential = databaseCredentials[NODE_ENV];

export { databaseCredential };