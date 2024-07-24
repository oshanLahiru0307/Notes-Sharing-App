require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const notesrouter =  require('./NotesRouter/NotesRouter')
//get express app
const app = express()

//use express middleware
app.use(express.json())

app.use('/api/notes', notesrouter)

mongoose.connect(process.env.MONGO_URI)
.then( ()=> {
    app.listen(process.env.PORT, ()=> {
        console.log('connected to the database & app is listening to the PORT', process.env.PORT)
    })
})
.catch( (error)=> {
 console.log(error)
})
