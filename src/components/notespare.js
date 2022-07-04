import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../Context/Notecontext';
import NotesItem from './NotesItem';


function Notespare() {
   const context = useContext(noteContext);
   const [notes, setnote] = useState({ id: '', etitle: '', edescription: '', etag: '' })
   // eslint-disable-next-line
   const { note, getnotes, Editnote } = context;
   useEffect(() => {
      getnotes();
      // eslint-disable-next-line
   }, [])
   const closeref = useRef(null);
   const ref = useRef(null);
   const editnote = (currentnote) => {
      ref.current.click();
      setnote({ id: currentnote._id, etitle: currentnote.Title, edescription: currentnote.Description, etag: currentnote.Tag })
   }

   const onChanges = (e) => {
      setnote({ ...notes, [e.target.id]: e.target.value });
   }
   const onClicks = (e) => {
      e.preventDefault();
      Editnote(notes.id, notes.etitle, notes.edescription, notes.etag);
      closeref.current.click();
   }

   return (
      <>
         {/*  Button trigger modal  */}
         <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
         </button>

         {/*  Modal  */}
         <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <form className='container'>
                        <div className="mb-3">
                           <label htmlFor="etitle" className="form-label">Title</label>
                           <input type="etitle" className="form-control" id="etitle" aria-describedby="etitle" onChange={onChanges} value={notes.etitle} />
                        </div>
                        <div className="mb-3">
                           <label htmlFor="edescription" className="form-label">description</label>
                           <input type="edescription" className="form-control" id="edescription" onChange={onChanges} value={notes.edescription} />
                        </div>
                        <div className="mb-3">
                           <label htmlFor="etag" className="form-label">Tag</label>
                           <input type="etag" className="form-control" id="etag" onChange={onChanges} value={notes.etag} />
                        </div>
                     </form>
                  </div>
                  <div className="modal-footer">
                     <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                     <button type="button" className="btn btn-primary" onClick={onClicks}>Update Notes</button>
                  </div>
               </div>
            </div>
         </div>
         {/* Code for displaying notes */}
         <div className='container my-3'>
            <h2>Your Notes :</h2>
            <div className='container'  style={{fontSize:'x-large'}}>{note.length===0 && "No Notes Available"}</div>
            <div className='row ' style={{ height: "330px", overflow: "scroll" }}>
               {note.map((notes) => {
                  return <NotesItem key={notes._id} editnote={editnote} notes={notes} />
               })}
            </div>
         </div>
      </>
   )
}

export default Notespare