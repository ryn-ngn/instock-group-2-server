const express = require('express')
const router = express.Router()

//routes handlers
router.route('/').get((req, res) => {
    try {
        res.status(200).json('this is inventory route')
    } catch (error) {
        res.status(400).send(`Couldn't retrieve inventory data: ${error}`);
    }
})