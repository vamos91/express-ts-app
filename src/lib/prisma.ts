import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.js";

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

if (!DATABASE_HOST || !DATABASE_USER || !DATABASE_PASSWORD || !DATABASE_NAME) {
  throw new Error(
    "La configuration MySQL est incomplète dans les variables d’environnement",
  );
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("La variable DATABASE_URL est absente");
}

const adapter = new PrismaMariaDb(databaseUrl);

// const adapter = new PrismaMariaDb({
//   host: DATABASE_HOST,
//   port: Number(DATABASE_PORT ?? 3306),
//   user: DATABASE_USER,
//   password: DATABASE_PASSWORD,
//   database: DATABASE_NAME,
//   connectionLimit: 5,
// });

export const prisma = new PrismaClient({
  adapter,
});
