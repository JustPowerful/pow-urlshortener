const express = require('express')
const router = express.Router()
const moment = require('moment')

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
    
    if (data)
    {
        Url.findById(req.params.id, function(err, url) {
            url.clicks++
            url.save()
        })
        res.redirect(data.longUrl)
    }
    else {
        // If there's no shortened link that has the given id : ERROR
        res.redirect('/')
    }
    
})

router.get('/stats/:id', async (req, res) => {
    const data = await Url.findById(req.params.id)
    
    if (data)
    {
        const url = req.protocol + '://' + req.get('host');
        res.render('viewstats', {data: data, url: url, moment: moment})
    }
    else 
    {
        res.redirect('/')
    }
})

module.exports = router