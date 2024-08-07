import pg from "pg";
import env from "dotenv";

env.config();

try{
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

    db.connect();
} catch(err) {
    console.log(err);
    console.log(process.env.PG_USER, process.env.PG_HOST, process.env.PG_DATABASE, process.env.PG_PASSWORD, process.env.PG_PORT, process.env.PG_CA_CERT);
}


export default db;