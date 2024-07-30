const express = require('express')
const Note = require('../models/notesModel')
const mongoos = require('mongoose')



//add note request...
const addNote = async(req,res) => {
    const{title, content} = req.body
    try{
        const note = await Note.create({title, content})
        return res.status(200).json(note)
    }catch(error){
        return res.status(400).json({erro: error.message})
    }
}

//get all Notes request...
const getAllNotes = async(req, res) => {
    const notes = await Note.find({}).sort({createdAt: -1})   
    if(!notes){
        return res.status(404).json({mssg: "there is not any note"})
    }
    return res.status(200).json(notes)
}
 
//get a single Note request...
const getSingleNote = async(req, res) => {
    const {id} = req.params
    if(!mongoos.Types.ObjectId.isValid(id)){
        return res.status(404).json({mssg: "there is not such a note"})
    }
    const note = await Note.findById(id)
    if(!note){
        return res.status(404).json({mssg: "there is not such a note"})
    }
    return res.status(200).json(note)
}

//delete a singlee note requst...
const deleteNote = async(req, res) => {
const {id} = req.params
if(!mongoos.Types.ObjectId.isValid(id)){
    return res.status(404).json({mssg: "there is not such a note"})
}
const note = await Note.findByIdAndDelete(id)
if(!note){
    return res.status(404).json({mssg: "there is not such a note"})
}
return res.status(200).json(note)
}

//update note request...
const updateNote = async(req, res) => {
    const {id} = req.params
    if(!mongoos.Types.ObjectId.isValid(id)){
        return res.status(404).json({mssg: "there is not such a note"})
    }
    const note = await Note.findOneAndUpdate({_id: id}, {
        ...req.body} )

    if(!note){
        return res.status(400).json({mssg:"there is not such a note"})
    }

}

module.exports = {addNote, getAllNotes, getSingleNote, deleteNote, updateNote}