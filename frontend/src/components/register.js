import {React, useEffect,useState} from "react";
import { useNavigate,Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginstatus } from "../slices/loginstatus";
import { serverUrl } from "../api/serverUrl";


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

        const response = await fetch(`${serverUrl}/register`,{
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
            setError('An error has occurred. Please try different username');
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

            <div class="col-xl-5 col-lg-7 col-md-8 col-sm-9 col-12 register">

                <p class="fw-light">Already have an account?<br></br> <Link to={'/login'}> Login </Link> </p> 

                

                <form onSubmit={handlesumbit}>

                    <div class="form-outline mb-4">
                        <label class="form-label" for="registerName">first Name</label>
                        <input type="text" required id="registerName" class="form-control" value={firstName} onChange={(e) => setfirstName(e.target.value)}/>
                    </div>

                    <div class="form-outline mb-4">
                        <label class="form-label" for="registerName">Last Name</label>
                        <input type="text" required id="registerName" class="form-control" value={lastName} onChange={(e) => setlastName(e.target.value)}/>
                    </div>
                
                    
                    <div class="form-outline mb-4">
                        <label class="form-label" for="registerUsername">Username</label>
                        <input type="text" required id="registerUsername" class="form-control" value={username} onChange={(e) => setusername(e.target.value)}/>                      
                    </div>

                    <div class="form-outline mb-4">
                        <label class="form-label" for="registerUsername">Password</label>
                        <input type="password" required  id="registerPassword" class="form-control" value={password} onChange={(e) => setpassword(e.target.value)}/>                       
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