import noteContext from './Notecontext';
import { useState } from 'react';


const NoteState = (props) => {
   const host = "http://localhost:4000"
   const notes = [];
   const [note, setnote] = useState(notes);

   const getnotes = async () => {
         const response = await fetch(`${host}/api/notes/getnotes`, {
            method: 'GET',
            headers: {
               "auth-token": localStorage.getItem('token')
            },
            // body: JSON.stringify()
         });
         // eslint-disable-next-line
         const json = await response.json();
         setnote(json);

   }

   const Addnote = async (Title, Description, Tag) => {
      //fetching notes from database.. using API call

      const response = await fetch(`${host}/api/notes/addnotes`, {
         method: 'POST',
         headers: {
            'Content-Type': ' application/json ',
            "auth-token": localStorage.getItem('token')
         },
         body: JSON.stringify({ Title, Description, Tag })
      });
      // eslint-disable-next-line
      const json = await response.json();
      // const not = {
      //    "_id": "62bd26863b55c1d60aff9",
      //    "user": "62bb48559ba245ac2f913784",
      //    "Title": Title,
      //    "Description": Description,
      //    "Tag": Tag,
      //    "date": "2022-06-30T04:54:00.387Z",
      //    "__v": 0
      // }
      //  notes.push(not);
      if (!json.error) {
         setnote(note.concat(json)); //concat returns an array whereas push updates an array
      }
   }
   const Deletenote = async (id) => {

      //fetching notes from database.. using API call

      const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
         method: 'DELETE',
         headers: {
            "auth-token": localStorage.getItem('token')
         },
         // body: JSON.stringify({ Title, Description, Tag })
      });
      // eslint-disable-next-line
      const json = await response.json();

      const newnote = note.filter((notes) => { return notes._id !== id });
      setnote(newnote);
   }
   const Editnote = async (id, Title, Description, Tag) => {
      //fetching notes from database.. using API call

      const response = await fetch(`${host}/api/notes/updatenews/${id}`, {
         method: 'PUT',
         headers: {
            'Content-Type': ' application/json ',
            "auth-token": localStorage.getItem('token')
         },
         body: JSON.stringify({ Title, Description, Tag })
      });

      // eslint-disable-next-line
      const json = response.json();

      //logic of editing note.
      const prevnote = JSON.parse(JSON.stringify(note));
      for (let index = 0; index < note.length; index++) {
         const element = prevnote[index];
         if (element._id === id) {
            prevnote[index].Title = Title;
            prevnote[index].Description = Description;
            prevnote[index].Tag = Tag;
            break;
         }
      }
      setnote(prevnote);
      //  setnote({...note , prevnote})
   }
   return (
      <noteContext.Provider value={{ note, Addnote, Deletenote, Editnote, getnotes }}>
         {props.children}
      </noteContext.Provider>
   )
}

export default NoteState;