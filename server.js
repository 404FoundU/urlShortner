import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import shortUrl from "./models/shortUrl.js";

dotenv.config();
const app = express();
const port = 5001;
app.use(cors());
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
app.use(express.urlencoded({extended: false}))
app.get('/', async (req, res) => {
    res.render('index');
});
app.post('/shortUrls', async (req, res)=>{

})


