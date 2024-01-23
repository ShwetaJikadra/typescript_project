import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import path from "path";
import { DBUtil } from "./db/dbUtil";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));


// Serve static images
const imagepath = path.join(__dirname, "public", "images");
app.use("/public/images", express.static(imagepath));

// Routes
import user from "./routes/user/index.routes";
import admin from "./routes/admin/index.routes";
  
app.use("/api/user", user);
app.use("/api/admin", admin);


const port: number = Number(process.env.PORT) || 1010;
const dbUrl: string = process.env.MONGO_DB_URL || "";
const dbName: string = process.env.MONGO_DB_NAME || "";

// Environment variables validation
if (!port || !dbUrl || !dbName) {
  console.error("Please provide valid values for PORT, MONGO_DB_URL, and MONGO_DB_NAME");
  process.exit(1);
}

// Start the server
app.listen(port, async () => {
  try {
    const dbResponse = await DBUtil.connectToDB(dbUrl, dbName);
    console.log(dbResponse);
    console.log(`Server started at http://localhost:${port}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
