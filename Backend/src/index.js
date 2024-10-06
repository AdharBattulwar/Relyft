import dotenv from "dotenv";

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
