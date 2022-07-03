import React from 'react'
import { useContext } from 'react';
import noteContext from '../Context/Notecontext';

function About() {
   const a = useContext(noteContext);
   return (
      <div>This is all About {a.name} and his roll no is {a.roll}</div>
   )
}

export default About