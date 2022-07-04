import React  from 'react'
import { Link, useLocation } from 'react-router-dom'

const SignUp = () => {
   const location = useLocation();
   return (
      <div>
         {/* <!-- Button trigger modal --> */}
         <Link type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" className={`btn btn-primary mx-1 ${location.pathname === "/signup" ? 'active' : ' '}`} to="/login" >SignUP</Link>

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
                           <label htmlFor="exampleInputEmail3" className="form-label">Email address</label>
                           <input type="email" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" />
                           <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                           <label htmlFor="exampleInputPassword3" className="form-label">Password</label>
                           <input type="password" className="form-control" id="exampleInputPassword3"  />
                        </div>
                        <div className="mb-3 form-check">
                           <input type="checkbox" className="form-check-input" id="exampleCheck3" />
                           <label className="form-check-label" htmlFor="exampleCheck3">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                     </form>
                  </div>
                  <div className="modal-footer">
                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SignUp