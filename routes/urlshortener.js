const express = require('express')
const router = express.Router()

const validUrl = require('valid-url');

const Url = require('../models/url')

router.post('/create', async (req, res) => {
    const {title, longUrl} = req.body
    
    if (validUrl.isUri(longUrl))
    {
        const shortUrl = new Url({
            title: title,
            longUrl: longUrl
        })
        const info = await shortUrl.save()
    
        const url = req.protocol + '://' + req.get('host');
        res.render('viewurl', {info: info, url: url})
    }
    else 
    {
        res.send("Invalid url: please make sure you're in this format : https://websiteexample.com")
    }
})

router.get('/i/:id', async (req, res) => {
    const data = await Url.findById(req.params.id)
    res.redirect(data.longUrl)
})

module.exports = router