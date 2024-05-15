import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import ".//css/loginAndSignUp.css"


function SignUp() {

    const navigate = useNavigate();

    const [username, setUserName] = useState('');
    const [displayName, setdisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');

    const goToLoginPage = () => {
        navigate("/")
    }

    const onSignUpClick = async () => {
        try {
            // use data destructuring to get data from the promise object
            const response = await axios.post("http://127.0.0.1:8000/api/post/add_user", {
                "username": username,
                "displayname": displayName,
                "bio": bio,
                "password": password
              }).catch((error) => {alert(error)}); 
            
            console.log(response.data)
            if (response.data === true) {
                navigate("/");
            } else {
                alert("Invalid username or password, please try again")
            }
        
          } catch (error) {
            console.log(error);
          }

    }

    return (
        <div className='login-container'>
            <div className='title'>
                <div>Sign Up</div>
            </div>
            <input className='back-button' type='button' onClick={goToLoginPage} value='Back to Login'></input>
            <div>
                <div className='login-input'>
                    <input 
                        className='input-box'
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        >
                    </input>
                </div>

                <div className='login-input'>
                    <input 
                        className='input-box'
                        placeholder='optional: displayname'
                        value={displayName}
                        onChange={(e) => setdisplayName(e.target.value)}
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

                <div className='login-input'>
                    <input 
                        className='input-box'
                        placeholder='tell others about yourself!'
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}>

                    </input>
                </div>


                
                <br></br>
                <div className={'login-input'}>
                    <input className={'login-signup-button'} type="button" onClick={onSignUpClick} value={'Sign Up'} />
                </div>
            </div>

        </div>
    )

}
export default SignUp