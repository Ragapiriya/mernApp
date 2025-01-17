import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js"

const __filename= fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename);
dotenv.config();
const app= express();   

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); 
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
//when someone uploads file to our app, it will store under public/assets folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }); 
 
app.post("/auth/register",upload.single("picture"),register);

//Mongoose setup
const PORT = process.env.PORT || 8081; //if 8080 port doesn't work, 9001 will.
// console.log("MongoDB URI: ",process.env.MONGO_URL); 
mongoose
  .connect(process.env.MONGO_URL) 
  .then(() => { 
    app.listen(PORT, () => console.log(`Server Port:${PORT}`));
  })
//   .catch((error) => console.log(`${error} did not connect`));
  .catch((error) => console.log("Did not connect",error));

