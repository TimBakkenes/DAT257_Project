import React, {useState} from 'react';
import ".//css/loginAndSignUp.css"
import { useNavigate } from 'react-router-dom'
import axios from "axios";

function Login() {

    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const onLoginClick = async () => {

        try {
            // use data destructuring to get data from the promise object
            const response = await axios.get("http://127.0.0.1:8000/api/get/login", {params: {
                username: userName,
                password: password
              }}); 
            
            console.log(response.data)

            if (response.data === true) {
                navigate("/home", {state: {user: userName}});
            } else {
                console.log("Wrong password")
                alert("Wrong password or username")
            }
          } catch (error) {
            console.log(error);
            console.log("Wrong password")
          }

    } 

    const onSignUpClick = async () => {
        navigate("/signup")
    }

    return (
        <div className='login-container'>
            <div className='title'>
                <div>Login</div>
            </div>
            <div>
                <div className='login-input'>
                    <input 
                        className='input-box'
                        placeholder='username'
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                        >
                    </input>
                </div>

                <div className='login-input'>
                    <input 
                        className='input-box'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    
                    </input>
                </div>
                <br />
                <div className={'login-input'}>
                    <input className={'login-signup-button'} type="button" onClick={onLoginClick} value={'Log in'} />
                </div>
                <br></br>
                <p className='signup'>Don't have an account? Then sign up below.</p>
                <div className={'login-input'}>
                    <input className={'login-signup-button'} type="button" onClick={onSignUpClick} value={'Sign Up'} />
                </div>
            </div>

        </div>
    );
}
export default Login