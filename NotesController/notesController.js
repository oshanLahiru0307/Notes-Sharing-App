const express = require('express')
const app = express()
const router = express.Router()
const Note = require('../models/notesModel')
const mongoos = require('mongoose')



//add note request...
const addNote = async(req,res) => {
    const{title, content} = req.body
    try{
        const note = await Note.create({title, content})
        res.status(200).json(note)
    }catch(error){
        res.status(400).json({erro: error.message})
    }
}

//get all Notes request...
const getAllNotes = async(req, res) => {
    const notes = await Note.find({}).sort({createdAt: -1})   
    if(!notes){
        res.status(404).json({mssg: "there is not any note"})
    }
    res.status(200).json(notes)
}
 
//get a single Note request...
const getSingleNote = async(req, res) => {
    const {id} = req.params
    if(!mongoos.Types.ObjectId.isValid(id)){
        res.status(404).json({mssg: "there is not such a note"})
    }
    const note = await Note.findById(id)
    if(!note){
        res.status(404).json({mssg: "there is not such a note"})
    }
    res.status(200).json(note)
}

//delete a singlee note requst...
const deleteNote = async(req, res) => {
const {id} = req.params
if(!mongoos.Types.ObjectId.isValid(id)){
    res.status(404).json({mssg: "there is not such a note"})
}
const note = await Note.findByIdAndDelete(id)
if(!note){
    res.status(404).json({mssg: "there is not such a note"})
}
res.status(200).json(note)
}

//update note request...
const updateNote = async(req, res) => {
    const {id} = req.params
    if(!mongoos.Types.ObjectId.isValid(id)){
        res.status(404).json({mssg: "there is not such a note"})
    }
    const note = await Note.findByIdAndUpdate({_id:id},{...req.body})

    if(!note){
        res.status(400).json({mssg:"there is not such a note"})
    }

}

module.exports = {addNote, getAllNotes, getSingleNote, deleteNote, updateNote}