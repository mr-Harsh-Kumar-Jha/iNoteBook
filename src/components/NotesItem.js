import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import noteContext from '../Context/Notecontext';
// import{fapentosquare} from '@fortawesome/fontawesome-svg-core'

function NotesItem(props) {
   const context = useContext(noteContext);
   const { Deletenote } = context;
   // eslint-disable-next-line
   const { notes, editnote } = props;
   return (
      <>
         <div className='col-md-3' >
            <div className="card my-3">
               <div className="card-body">
                  <h5 className="card-title">{notes.Title}  </h5>
                  <p className="card-text">{notes.Description}</p>
                  <FontAwesomeIcon className="mx-2" icon={faPenToSquare} onClick={() => { editnote(notes) }} />
                  <FontAwesomeIcon className="mx-2" icon={faTrashCan} onClick={() => {
                     Deletenote(notes._id);
                  }} />
               </div>
            </div>
         </div>
      </>
   )
}

export default NotesItem