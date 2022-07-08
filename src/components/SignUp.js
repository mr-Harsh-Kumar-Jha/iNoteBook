import React, { useRef, useState } from 'react'

const SignUp = () => {
   const [createcred, setcreatecred] = useState({ name: "", email: "", password: "", recheckpass: "" });
   const close = useRef(null);
   const onchanges = (e) => {
      setcreatecred({ ...createcred, [e.target.id]: e.target.value });
   }
   const onclicks = async (e) => {
      // e.preventDefault();
      if (createcred.password !== createcred.recheckpass) {
         alert("cross check password and confirmed password");
      }
      else {
         const response = await fetch("http://localhost:4000/api/auth/createuser", {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: createcred.name, email: createcred.email, password: createcred.password })
         });
         const json = await response.json();
         if (json.success) {
            window.location.reload();
            localStorage.setItem('token', json.authtoken);
            close.current.click();

         }
         else {
            console.log(json);
            alert(json.errors);
         }
      }
   }
   return (
      <div>
         {/* <!-- Button trigger modal --> */}
         <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModales" className="btn btn-primary mx-1 " href="/signup" >SignUP</button>

         {/* <!-- Modal --> */}
         <div className="modal fade" id="exampleModales" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
               <div className="modal-content " >
                  <div className="modal-header">
                     <h5 className="modal-title" id="exampleModalLabel">SignUP</h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">

                     <section className="vh-80" style={{ backgroundColor: "#eee" }}>
                        <div className="container h-100">
                           <div className="row d-flex justify-content-center align-items-center h-100">
                              <div className="col-lg-12 col-xl-11">
                                 <div className="card text-black" style={{ borderRadius: "25px" }}>
                                    <div className="card-body ">
                                       <div className="row justify-content-center">
                                          <div className=" col-lg-6 col-xl-5 order-2 order-lg-1">

                                             <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                             <form className="mx-1 mx-md-4">

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                   <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                   <div className="form-outline flex-fill mb-0">
                                                      <input type="text" id="name" className="form-control" onChange={onchanges} value={createcred.name}/>
                                                      <label className="form-label" htmlFor="name">Your Name</label>
                                                   </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                   <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                   <div className="form-outline flex-fill mb-0">
                                                      <input type="email" id="email" className="form-control" onChange={onchanges} value={createcred.email}/>
                                                      <label className="form-label" htmlFor="email">Your Email</label>
                                                   </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                   <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                   <div className="form-outline flex-fill mb-0">
                                                      <input type="password" id="password" className="form-control" onChange={onchanges} value={createcred.password} minLength={5} required/>
                                                      <label className="form-label" htmlFor="password">Password</label>
                                                   </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                   <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                   <div className="form-outline flex-fill mb-0">
                                                      <input type="password" id="recheckpass" className="form-control" onChange={onchanges} value={createcred.recheckpass} minLength={5} required/>
                                                      <label className="form-label" htmlFor="recheckpass">Repeat your password</label>
                                                   </div>
                                                </div>

                                                <div className="form-check d-flex justify-content-center mb-5">
                                                   <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                   <label className="form-check-label" htmlFor="form2Example3">
                                                      I agree all statements in <a href="#!">Terms of service</a>
                                                   </label>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                   <button type="button" className="btn btn-primary btn-lg" onClick={onclicks}>Register</button>
                                                </div>

                                             </form>

                                          </div>
                                          <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2" >

                                             <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample" />

                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </section>

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

export default SignUp