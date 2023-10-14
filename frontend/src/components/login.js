import {React,useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginstatus } from "../slices/loginstatus";
import { loadcart } from "../slices/cartSlice";
import { Link } from "react-router-dom";
import { serverUrl } from "../api/serverUrl";

function Login(){

    const dispatch = useDispatch();
    const [username, setusername] = useState();
    const [password, setpassword] = useState();
    
    const [error, setError] = useState('')
    const navigate = useNavigate();

    async function handlesumbit(e) {
        e.preventDefault();
        const data = {username,password};

        const response = await fetch(`${serverUrl}/login`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
            credentials: 'include',
        })         
        .then(async response => {
            const status =  response.status;
            if (status !== 201) {
                throw new Error('Server error');
            } else{
                dispatch(loginstatus())
                dispatch(loadcart())
                navigate({pathname:'/'})
                
            }
        })
        .catch(error => {
            console.error(error);
            setError('An error has occurred. Please check your username and passowrd.');
        })
    } 


    return (
    <>
        <div class="row header cart_checkout" id="login_heading">
            <div class="col text-center">
                <h1>Login</h1>
            </div>
            
        </div>

        <div class="row justify-content-center login_row ">

            <div class="col-5 login">

                <p class="fw-light">Don't have have an account? <Link to={'/register'}> Register </Link> </p> 


                <div class="mb-4 text-center facebook">
                    <a class="btn btn-outline-dark text-decoration-none" href={`${serverUrl}/google`}>Login with Google</a>
                </div>

                <form onSubmit={handlesumbit}>
                                    
                    <div class="form-outline mb-4">
                        <label class="form-label" for="loginUsername">Username</label>
                        <input type="text" required id="loginUsername" class="form-control" value={username} onChange={(e) => setusername(e.target.value)}/>                      
                    </div>

                    <div class="form-outline mb-4">
                        <label class="form-label" for="loginUsername">Password</label>
                        <input type="password" required id="loginUsername" class="form-control" value={password} onChange={(e) => setpassword(e.target.value)}/>                       
                    </div>

                    <span style={{ color: 'red', marginBottom: '2%', marginLeft:'10%', display:'block' }}>{error}</span>
                    <button class="btn btn-outline-dark px-5 border-1 text-decoration-none login_btn" type="submit">Log in</button>

                </form>

            </div>

        </div>
    </>
    )
}

export default Login
