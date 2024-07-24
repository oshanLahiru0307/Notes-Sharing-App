const express = require('express')
const router = express.Router()
const {addNote,
    getAllNotes,
    getSingleNote,
    deleteNote,
    updateNote 
} = require('../controller/notesController')

//get all Notes request...
router.get('/', getAllNotes)

//get a single Note request...
router.get('/:id', getSingleNote)

//add note request...
router.post('/', addNote)

//delete a singlee note requst...
router.delete('/:id', deleteNote)

//update note request...
router.patch('/:id', updateNote)

module.exports = router