import React ,{useState,useRef} from 'react'
import { Link, useLocation } from 'react-router-dom'


const Login = () => {
   const location = useLocation();
   const close = useRef(null);
   const [credentials, setcreden] = useState({emails:'' , passwords:''});
   const onChanges = (e) => {
      setcreden({ ...credentials, [e.target.id]: e.target.value });
   }
   const handleclick =async (e)=>{
      e.preventDefault();
      const response = await fetch("http://localhost:4000/api/auth/login", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email:credentials.emails , password:credentials.passwords })
      });
      const json = await response.json();
      console.log(json);
      close.current.click();
   }

   return (
      <div>
         {/* <!-- Button trigger modal --> */}
         <Link type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className={`btn btn-primary mx-1 ${location.pathname === "/login" ? 'active' : ' '}`} to="/login" >Login</Link>

         {/* <!-- Modal --> */}
         <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                     <form >
                        <div className="mb-3">
                           <label htmlFor="emails" className="form-label">Email address</label>
                           <input type="emails" className="form-control" id="emails" aria-describedby="emailHelp" onChange={onChanges} value={credentials.emails}/>
                           <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                           <label htmlFor="passwords" className="form-label">Password</label>
                           <input type="passwords" className="form-control" id="passwords" onChange={onChanges} value={credentials.passwords}/>
                        </div>
                        <div className="mb-3 form-check">
                           <input type="checkbox" className="form-check-input" id="exampleCheck2" />
                           <label className="form-check-label" htmlFor="exampleCheck2">Check me out</label>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleclick}>Submit</button>
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