import express from 'express';
import initApp from './src/app.js';
import path from 'path'
import { fileURLToPath } from 'url'
import * as dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })

const app = express();
const port =  process.env.PORT || 5000


app.use(express.json());
app.use(cookieParser());
initApp(app, express);
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}!!!!`);
});
