const express = require('express')
const router = express.Router()
const Park = require('../models/park.model')

// Aquí los endpoints

router.get('/new', (req, res) => res.render('parks/new-park'))

router.post('/new', (req, res) => {
    const {name, description} = req.body
    Park.create({
        name,
        description
    })
    .then(newPark => res.render('parks/new-park'))
    .catch(err => console.log("Error consultando la BBDD", err))})

module.exports = router