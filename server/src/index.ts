import * as dotenv from "dotenv";
import path from "path";
import app from "./app.js";

const envFile = process.env.NODE_ENV === "production" ? ".env-prod" : ".env-dev";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
