import dotenv from "dotenv";
import serverless from "serverless-http";

dotenv.config({
  path: "./src/config/.env",
});

//Mongo connection
import connection from "./db/index.js";
connection();

//app config
import app from "./app.js";

app.listen(process.env.PORT || 3000, () => {
  console.log(`The Server is running on port ${process.env.PORT}`);
});

export const handler = serverless(app);