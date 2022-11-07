import React, { useState } from "react";
import NotesContext from "./NotesContext";

const NotesState = (props) => {

  const intialstate = []


  const [notes, setnotes] = useState(intialstate)



  //  getnote
  const getnotes = async () => {

    const url = "http://localhost:5000/get/notes/fetchAllnotes"

    const response = await fetch(url, {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')

      },


    });
    const data = await response.json()

    setnotes(data)
  }




  // Add notes




  const addnotes = async (tittle, description, tag) => {

    const u = "http://localhost:5000/get/notes/addNotes"

    const response = await fetch(u, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')


      },

      body: JSON.stringify({ tittle, description, tag }) // body data type must match "Content-Type" header
    });

   const note = await response.json()
    setnotes(notes.concat(note))
  }



  const deletenotes = async (id) => {



    const response = await fetch('http://localhost:5000/get/notes/deletenotes/' + id, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.

      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')


      },

      body: JSON.stringify({}) // body data type must match "Content-Type" header
    });

    const json = await response.json();
    console.log(json.tittle)

    const newnote = notes.filter((note) => { return note._id !== id })
    setnotes(newnote);

  }

    // Edit a Note
    const editNote = async (id, tittle, description, tag) => {
      // API Call 
      const response = await fetch('http://localhost:5000/get/notes/updatenotes/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({tittle, description, tag})
      });
      const json = await response.json(); 
  
       let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].tittle = tittle;
          newNotes[index].description = description;
          newNotes[index].tag = tag; 
          break; 
        }
      }  
      setnotes(newNotes);
    }
    
  return (
    <>

      <NotesContext.Provider value={{ notes, setnotes, addnotes, deletenotes, getnotes,editNote }}>
        {props.children}
      </NotesContext.Provider>
    </>
  )

}

export default NotesState;
