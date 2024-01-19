import mysql from 'mysql2';

export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const connectToDatabase = () => {
    connection.connect((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Connected to database...");
        }
    });
}