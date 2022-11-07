import React from 'react'
import { useContext } from 'react';
import NotesContext from '../Context/notes/NotesContext';

const Noteitem = (props) => {
    const{note,updateNote} = props;
  const Context = useContext(NotesContext);
  const{ deletenotes} = Context; 
  return (
   <>

<div className="col-md-3" >
    <div className='card my-3'>
  <div className="card-body">
    <div className='d-flex align-items-center'>
    <h5 className="card-title">{note.tittle}</h5>
    <i className="fa-solid fa-trash mx-2 " onClick={()=>{deletenotes(note._id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
    </div>
    <p className="card-text">{note.description}</p>
  </div>
  </div>
</div>
   </>
  )
}

export default Noteitem
