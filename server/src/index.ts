import { app } from "./app.js";
import { connectToDatabase } from "./db/db-connection.js";
import appRouter from "./routes/index.js";

const PORT = process.env.PORT || 5000;

connectToDatabase();
app.use("/api/v1", appRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});