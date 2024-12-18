import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync("db.sqlite");

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    )
    `);
db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     user_id INTEGER,
     title TEXT NOT NULL,
     description TEXT,
     FOREIGN KEY (user_id) REFERENCES users(id)
    )
    `);

export default db;
