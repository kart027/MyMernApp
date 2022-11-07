import React, { useEffect, useRef,useState } from 'react'
import NotesContext from '../Context/notes/NotesContext';
import { useContext } from 'react';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


const Notes = () => {
  const c = useContext(NotesContext);
  const { notes, getnotes,editNote } = c;
  let navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')){
    getnotes();
    }else{
      navigate('/Login')
    }
    // eslint-disable-next-line
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ref = useRef(null)
  
  const ref2 = useRef(null)



  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({ id:currentNote._id,etittle:currentNote.tittle,edescription:currentNote.description,etag:currentNote.tag})

  }
  const [note,setnote] = useState({id:"",etittle:"",edescription:"" ,etag:""})

    const handleclick =(e)=>{
        editNote(note.id,note.etittle,note.edescription,note.etag)
        ref2.current.click();
      
    }

    const onChange = (e)=>{
            setnote({...note,[e.target.name]: e.target.value})

    }


  return (
    <>
      <Addnote />
      <Button variant="primary" ref={ref} onClick={handleShow}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit tittle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3">
        <Form.Label>Tittle</Form.Label>
        <Form.Control type="text" placeholder="Enter email" id='etittle' name='etittle' value={note.etittle} onChange={onChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" id='edescription' name='edescription' value={note.edescription} onChange={onChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Tag</Form.Label>
        <Form.Control type="text" id='etag' name='etag' value={note.etag} onChange={onChange}/>
      </Form.Group>
     
     
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} ref={ref2}>
            Close
          </Button>
          <Button variant="primary" onClick={handleclick} >updateNote</Button>
        </Modal.Footer>
      </Modal>
    
     

      <div className='row my-3'>
        <h2>
          your Note
        </h2>
        <div className='container'>
          {notes.length===0 ? 'No notes to display': ""}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes;
