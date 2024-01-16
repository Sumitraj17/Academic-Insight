import mysql from 'mysql';

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const connectToDatabase = () => {
    connection.connect((err) => {
        if (err) {
            console.log("[MYSQL_CONNECTION_ERROR]", err);
            return;
        }

        console.log("Connected to database successfully...");
    });
}

export const disconnectFromDatabase = () => {
    connection.end((err) => {
        if (err) {
            console.log("[MYSQL_DISCONNECT_ERROR]", err);
            return;
        }

        console.log("Disconnected from database successfully...");
    })
}