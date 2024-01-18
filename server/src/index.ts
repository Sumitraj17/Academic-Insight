import app from "./app.js";
import { connectToDatabase } from './db/db-connection.js';

connectToDatabase();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});

