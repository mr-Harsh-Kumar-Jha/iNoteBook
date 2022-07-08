import React, { useState, useRef } from 'react'
// import { Link } from 'react-router-dom';

const Login = () => {
   const close = useRef(null);

   const [credentials, setcreden] = useState({ email: '', password: '' });
   const onChanges = (e) => {
      setcreden({ ...credentials, [e.target.id]: e.target.value });
   }
   const handleclick = async (e) => {
      e.preventDefault();
      const response = await fetch("http://localhost:4000/api/auth/login", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
         localStorage.setItem('token', json.authtoken);
         close.current.click();
         window.location.reload();
      }
      else {
         alert("please login with correct credentials");
      }

   }

   return (
      <div>
         {/* <!-- Button trigger modal --> */}
         <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary mx-1 "  >Login</button>

         {/* <!-- Modal --> */}
         <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModaLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModaLabel">Login to Continue to iNoteBook</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <form onSubmit={handleclick}>
                        <div className="mb-3">
                           <label htmlFor="email" className="form-label">Email address</label>
                           <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChanges} value={credentials.email} />
                           <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                           <label htmlFor="password" className="form-label">Password</label>
                           <input type="password" className="form-control" id="password" onChange={onChanges} value={credentials.password} />
                        </div>
                        <div className="mb-3 form-check">
                           <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                           <label className="form-check-label" htmlFor="exampleCheck2">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary" >Submit</button>
                     </form>
                  </div>
                  <div className="modal-footer">
                     <button ref={close} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Login