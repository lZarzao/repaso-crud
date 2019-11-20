const express = require('express')
const router = express.Router()
const Park = require('../models/park.model')
const Coaster = require('../models/coaster.model')

// Aquí los endpoints

router.get('/new', (req, res) => { Park.find()
    .then(allParks => res.render('coasters/new-coaster', {allParks}))
    .catch(err => console.log("Error consultando la BBDD ", err))});

router.post('/new', (req, res) => {
    console.log(req.body)
    const {
        name,
        description,
        inversions,
        length,
        active,
        park
    } = req.body
    Coaster.create({
            name,
            description,
            inversions,
            length,
            active,
            park
        })
        .then(newCoaster => res.redirect('/coasters/new'))
        .catch(err => console.log("Error consultando la BBDD", err))
})

router.get('/', (req, res) => {
    Coaster.find()
    .populate('park')
        .then(allCoasters => res.render('coasters/coasters-index', {
            allCoasters
        }))
        .catch(err => console.log("Error consultando la BBDD ", err))
});

router.get('/:id', (req, res) => {
    Coaster.findById(req.params.id)
    .populate('park')
        .then(coaster => res.render('coasters/coaster-details', {
            coaster
        }))
        .catch(err => console.log("Error consultando la BBDD", err))
})

router.get('/:id/delete', (req, res) => {
    Coaster.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/coasters'))
        .catch(err => console.log("Error consultando la BBDD", err))
})

router.get('/:id/edit', (req, res) => {
    Coaster.findById(req.params.id)
        .then(coaster => res.render('coasters/coaster-edit', coaster = {coaster}))
        .catch(err => console.log("Error consultando la BBDD", err))
})

router.post('/:id/edit', (req, res) => {
    const {
        name,
        description,
        inversions,
        length,
        active,
    } = req.body
    Coaster.findByIdAndUpdate(req.params.id, {
            name,
            description,
            inversions,
            length,
            active,
        })
        .then(() => {
            res.redirect('/coasters')
        })
        .catch(err => console.log('Error consultando la BBDD', err))
})

module.exports = router