import React, { useEffect } from 'react'
import { useContext } from 'react';
import NotesContext from '../Context/notes/NotesContext';



const About = () => { 
    const a = useContext(NotesContext)

    useEffect(()=>{
        a.update();
    },[])
   
    return (
        <div>
            This is About page {a.state.name}
        </div>
    )
}

export default About;