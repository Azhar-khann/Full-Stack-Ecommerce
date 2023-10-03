import {React, useEffect,useState} from "react";
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginstatus } from "../slices/loginstatus";



function Register(){

    const [firstName, setfirstName] = useState();
    const [lastName, setlastName] = useState();
    const [username, setusername] = useState();
    const [password, setpassword] = useState();
    
    const [error, setError] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handlesumbit(e) {
        e.preventDefault();
        const data = {firstName,lastName,username,password};

        const response = await fetch('http://localhost:4000/register',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: 'include',
        })         
        .then(async response => {
            const status =  response.status;
            console.log(status)
            if (status === 501) {
                throw new Error('Server error');
            } else{
                dispatch(loginstatus())
                navigate({pathname:'/'})
                
            }

        })
        .catch(error => {
            console.error(error);
            setError('An error has occurred. Please try again');
        })
    } 

    return (
    <>
        <div class="row header cart_checkout" id="register_heading">
            <div class="col text-center">
                <h1>Register</h1>
            </div>
            
        </div>

        <div class="row justify-content-center register_row ">

            <div class="col-5 register">

                <p class="fw-light">Already have an account? <Link to={'/login'}> Login </Link> </p> 

                <p class="fw-light">Sign in with:</p>

                <div class="mb-4 text-center facebook">
                    <a class="btn btn-outline-dark text-decoration-none" href="category.html">Register with facebook</a>
                </div>

                <form onSubmit={handlesumbit}>

                    <div class="form-outline mb-4">
                        <label class="form-label" for="registerName">first Name</label>
                        <input type="text" id="registerName" class="form-control" value={firstName} onChange={(e) => setfirstName(e.target.value)}/>
                    </div>

                    <div class="form-outline mb-4">
                        <label class="form-label" for="registerName">Last Name</label>
                        <input type="text" id="registerName" class="form-control" value={lastName} onChange={(e) => setlastName(e.target.value)}/>
                    </div>
                
                    
                    <div class="form-outline mb-4">
                        <label class="form-label" for="registerUsername">Username</label>
                        <input type="text" id="registerUsername" class="form-control" value={username} onChange={(e) => setusername(e.target.value)}/>                      
                    </div>

                    <div class="form-outline mb-4">
                        <label class="form-label" for="registerUsername">Password</label>
                        <input type="text" id="registerPassword" class="form-control" value={password} onChange={(e) => setpassword(e.target.value)}/>                       
                    </div>

                    <span style={{ color: 'red', marginBottom: '2%', marginLeft:'10%', display:'block' }}>{error}</span>
                    <button class="btn btn-dark btn-lg mb-1 mt-2 px-4 register_btn text-center" type="submit">Register</button>

                </form>

            </div>

        </div>
    </>
    )
}

export default Register