const express = require("express");
const routes = express.Router();
const Notes = require("../models/notesSchema");
const Fetchuser = require("../Middleware/gettoken");



routes.get("/fetchAllnotes",Fetchuser,async(req,res)=>{

    try {

        
    
      const newnote = await Notes.find({});

      res.send(newnote)
        
    } catch (error) {
        res.send(error);
    }
   


})


routes.post("/addNotes",Fetchuser,async(req,res)=>{

    try {

        const{tittle,description,tag} = req.body;

        const note = new Notes({
            tittle,description,tag,user:req.user.id
        })
    
      const newnote = await  note.save();

      res.send(newnote)
        
    } catch (error) {
        res.send(error);
    }
   


})

routes.put("/updatenotes/:id",Fetchuser,async(req,res)=>{

    try {
            const {tittle,description,tag} = req.body;

            const newnote = {};
            if(tittle){newnote.tittle = tittle}
            if(description){newnote.description = description}
            if(tittle){newnote.tag = tag}

            let note = await Notes.findById(req.params.id);
            if(!note){
                return res.status(404).send("Note not found")
            }

            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Authorize")

            }
            note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true}) ;
                res.json(note);


       
        
    } catch (error) {
        res.send(error);
    }
   


})



routes.delete("/deletenotes/:id",Fetchuser,async(req,res)=>{

    try {
           

            let note = await Notes.findById(req.params.id);
            if(!note){
                return res.status(404).send("Note not found")
            }

            if(note.user.toString() !== req.user.id){
                return res.status(401).send("Authorize")

            }
            note = await Notes.findByIdAndDelete(req.params.id) ;
                res.json(note);


       
        
    } catch (error) {
        res.send(error);
    }
   


})


module.exports = routes