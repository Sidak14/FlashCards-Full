import pg from "pg";
import env from "dotenv";

env.config();


const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    ssl: {
        require: true,
        ca: process.env.PG_CA_CERT,
    }

});

await db.connect();

const query1 = "CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY,email VARCHAR(100) NOT NULL UNIQUE,password VARCHAR(100))"
const query2 = "CREATE TABLE IF NOT EXISTS questions(id SERIAL PRIMARY KEY,question VARCHAR(1000) NOT NULL,answer VARCHAR(1000) NOT NULL,user_id INTEGER REFERENCES users(id))"

await db.query(query1, function (err, result) {
    console.log(err, result);
})
await db.query(query2, function (err, result) {
    console.log(err, result);
})



export default db;