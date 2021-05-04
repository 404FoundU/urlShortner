import express from "express";
import shortUrl from "../models/shortUrl.js";

const router = express.Router();


router.get('/', async (req, res) => {
    res.render('index');
});
router.post('/shortUrls', async (req, res)=>{
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
export default router;