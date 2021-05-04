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
// tell express we are using url params
app.use(express.urlencoded({extended: false}))
app.get('/', async (req, res) => {
    res.render('index');
});
app.post('/shortUrls', async (req, res)=>{
       const short = new shortUrl();
       short.full = req.body.fullUrl;
       try {
           await short.save();
           // res.send(short);
           res.redirect('/')
       }
       catch (e){
           console.error(e);
           res.status(500).send(e);
       }
})


