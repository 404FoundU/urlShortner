import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import router from "./routes/routeer.js";

dotenv.config();
const app = express();
const port = 5001;
mongoose.connect(
    process.env.DB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
)
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .then(async client => {
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    });
app.set('view engine', 'ejs');
// tell express we are using url params
app.use(express.urlencoded({extended: false}))

app.use('/', router);

app.use(cors());

