import React, { useState } from 'react';
import logo from '../images/forever-logo-white-bg.png'
import './components.css'
import { useNavigate } from 'react-router-dom';
import { toaster} from '../config/toaster'
import Loader from '../config/Loader'
const Signin = () => {
    const [data , setData] = useState({});
    const navigate = useNavigate();
    const handleFieldChange =(e)=>{
        setData({...data , [e.target.name] : e.target.value })
     }
     const [loading , setLoading] = useState(false)

     const handleSignin =()=>{
        
        const {email , password} = data;
        if(email && password){     
                setLoading(true)
            fetch('http://localhost:5000/user/login',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email,
                  password,
                })
              }).then(res => res.json() ).then(data =>{
                if (data.error) {
                    toaster(data.error);
                }else{
                    toaster(data.message);
                   sessionStorage.setItem('token' , data.token);
                   sessionStorage.setItem('myId' , data._id);
                   sessionStorage.setItem('myPhoto' , data.photo);
                   setLoading(false)
                   navigate("/");
                }

                })
          
        }else{
            toaster("Please add all the fields properly")
        }
    }
    if(loading){
        return(<Loader/> )
    }
    return (
        <div className='signin'>
            <div className="signin-header">
                <img src={logo} alt="" className="signin-logo" />
                <div className="signin-text">
                    <p style={{fontSize:"2rem"}}>Sign in</p>
                    <p>Use your Forever account</p>
                </div>
            </div>
            <div className="signin-body">
                <div class="input-field">
                   <input type="text" id="password" name="email" placeholder='Email' required  onChange={ e =>handleFieldChange(e)} />
                </div>
                <div class="input-field">
                   <input type="password" id="password" name="password" placeholder='Password' required  onChange={ e =>handleFieldChange(e)} />
                </div>
                <p>Login and talk like there is no tomorrow.</p>
                <div className="signin-proceed">
                    <p className="toggle-auth" onClick={()=> navigate('/auth/createAccount')}>Create account</p>
                    <button className="login" onClick={()=> handleSignin()} >Sign in</button>
                </div>
            </div>
        </div>
    );
};

export default Signin;