const express = require('express')
const router = express.Router()

//routes handlers
router.route('/').get((req, res) => {
    try {
        res.status(200).json('this is warehouses route')
    } catch (error) {
        res.status(400).send(`Couldn't retrieve warehouses data: ${error}`);
    }
})