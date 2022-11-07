import React, { useState } from 'react'
import NotesContext from '../Context/notes/NotesContext';
import { useContext } from 'react';


const Addnote = () => {
    const c = useContext(NotesContext);
    const {addnotes} = c;

    const [note,setnote] = useState({tittle:"",description:"" ,tag:""})

    const handleclick =(e)=>{
        e.preventDefault()
        addnotes(note.tittle,note.description,note.tag)
        setnote({tittle:"",description:"" ,tag:""})
    }

    const onChange = (e)=>{
            setnote({...note,[e.target.name]: e.target.value})

    }

  return (
   <>
    <div className='container my-3'>
    <h1>
    Add a note
    </h1>
    <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Tittle</label>
    <input type="text" className="form-control" id="tittle" name='tittle' value={note.tittle} aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">tag</label>
    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
</form>
</div>
   </>
  )
}

export default Addnote
