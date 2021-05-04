import express from "express";
import shortUrl from "../models/shortUrl.js";

const router = express.Router();


router.get('/', async (req, res) => {
    // res.render('index');
    const shorts = await shortUrl.find();
    res.render('index', {shorts})
});
router.post('/shortUrls', async (req, res) => {
    const short = new shortUrl();
    short.full = req.body.fullUrl;
    try {
        await short.save();
        // res.send(short);
        res.redirect('/')
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});
router.get('/:shortUrl', async (req,res) =>{
    const shorts = await shortUrl.findOne({short: req.params.shortUrl})
    if (shorts == null) {
        res.send(404);
    }
    shorts.clicks++;
    await  shorts.save();
    res.redirect(shorts.full);
})
export default router;