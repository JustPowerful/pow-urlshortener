const mongoose = require('mongoose')
const slugify = require('slugify')
const shortid = require('shortid')


const urlSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: shortid.generate
        },

        title: {
            type: String,
            required: true
        },

        longUrl: {
            type: String,
            required: true
        },

    }
)

module.exports = mongoose.model('Url', urlSchema)