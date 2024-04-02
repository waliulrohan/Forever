import React, { useState } from 'react';
import logo from '../images/forever-logo-white-bg.png'
import './components.css'
import { useNavigate } from 'react-router-dom';
import { toaster} from '../config/toaster'
import Loader from '../config/Loader';
const CreateAccount = () => {
    const [data , setData] = useState({});
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate();
    const handleFieldChange =(e)=>{
        setData({...data , [e.target.name] : e.target.value })
     }
     const emailRegex = /.+@forever$/;
     
    const createAccount =()=>{
        const {name , email , password} = data;
        if(name && email && password){
          setLoading(true)
          if (!emailRegex.test(email)) {
            toaster('Please use @forever')
          }else{
            fetch('http://localhost:5000/user/signup',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  name,
                  email,
                  password,
                })
              }).then(res => res.json() ).then(data =>{
                if (data.error) {
                    toaster(data.error)
                }else{
                  setLoading(false)
                   navigate("/auth/signin")
                    toaster(data.message)
                }

                })
          }
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
                <div className="signin-text signin-quote">
                    <p>Everything you can imagine is real here.</p>
                </div>
            </div>
            <div className="signin-body">
            <div class="input-field">
                   <input type="text" id="password" name="name" placeholder='Name' required onChange={ e =>handleFieldChange(e)} />
                </div>
                <div class="input-field">
                   <input type="text" id="password" name="email" placeholder='Email' required  onChange={ e =>handleFieldChange(e)}  />
                </div>
                <div class="input-field">
                   <input type="password" id="password" name="password" placeholder='Password' required  onChange={ e =>handleFieldChange(e)}  />
                </div>
                <p>Create a Forever account for yourself.</p>
                <div className="signin-proceed">
                    <p className="toggle-auth" onClick={()=> navigate('/auth/signin')}>Have a account?</p>
                    <button className="login" onClick={()=> createAccount()} >Create</button>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;