const express = require('express')
const app = express()
const router = express.Router()
const {addNote,
    getAllNotes,
    getSingleNote,
    deleteNote,
    updateNote 
} = require('../NotesController/notesController')

//get all Notes request...
app.get('/', getAllNotes)

//get a single Note request...
app.get('/:id', getSingleNote)

//add note request...
app.post('/', addNote)

//delete a singlee note requst...
app.delete('/:id', deleteNote)

//update note request...
app.patch('/:id', updateNote)

module.exports = router