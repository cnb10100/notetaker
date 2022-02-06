const router = require('express').Router();

const storage = require('../db/storage');

// requesting the existing notes

router.get('/notes', (req, res) => {
    storage
        .getNotes()
        .then(notes => {
            res.json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// posting note function route 

router.post('/notes', (req, res) => {
    console.log(req.body)
    storage
        .addNote(req.body)
        .then(note => {
            res.json(note)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// delete note function route

router.delete('/notes/:id', (req, res) => {
    storage
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
})

module.exports = router;