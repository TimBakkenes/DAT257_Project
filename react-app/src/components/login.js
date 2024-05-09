import React, {useState, useRef} from 'react';
import ".//css/login.css"
import { useNavigate } from 'react-router-dom'
import axios from "axios";

export function Login() {
    const [currentUser, setcurrentUser] = useState('');

    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');

    // const navigate = useNavigate()

    /* const onLoginClick = () => {

        navigate("/home")



    } */

    

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
                    <input className={'login-button'} type="button" /* onClick={onLoginClick} */ value={'Log in'} />
                </div>
            </div>

        </div>
    )
}