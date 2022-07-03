import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from '../Context/Notecontext';
import Notespare from './notespare'

function Addnote() {
   const context = useContext(noteContext);
   const { Addnote } = context;
   const [notes, setnote] = useState({ title: '', description: '', tag: '' })


   const onChanges = (e) => {
      setnote({ ...notes, [e.target.id]: e.target.value });
   }
   const onClicks = (e) => {
      e.preventDefault();
      Addnote(notes.title, notes.description, notes.tag);
   }
   return (
      <>
         <div className="container">
            <h1 className='d-flex justify-content-center'> Notes </h1>
            <form className='container'>
               <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="title" className="form-control" id="title" aria-describedby="title" onChange={onChanges} />
               </div>
               <div className="mb-3">
                  <label htmlFor="description" className="form-label">description</label>
                  <input type="description" className="form-control" id="description" onChange={onChanges} />
               </div>
               <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="tag" className="form-control" id="tag" onChange={onChanges} />
               </div>
               <button type="submit" className="btn btn-primary" onClick={onClicks}>Make Note</button>
            </form>
            <Notespare />
         </div>
      </>

   )
}

export default Addnote