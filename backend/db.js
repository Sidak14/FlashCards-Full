import pg from "pg";
import env from "dotenv";

env.config();


const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
        require: true, // This will help you. But you will see nwe error
        rejectUnauthorized: false // This line will fix new error
        }
    },
});

await db.connect();


export default db;