import React, { useEffect, useState } from 'react';
import './tabs.css'
import { useNavigate, useParams } from 'react-router-dom';
import MyProfile from './MyProfile';
import { ArrowBack } from '@mui/icons-material';
import { Dialog, IconButton } from '@mui/material';
import { toaster} from '../../config/toaster'
import Loader from '../../config/Loader';

const Profile = () => {
    const myId = sessionStorage.getItem('myId')
    const token = sessionStorage.getItem('token')
    const [data , setData] = useState({})
    const {userId} = useParams()
    const navigate = useNavigate()

    
    useEffect(()=>{
        if(token && userId){
            fetch('http://localhost:5000/user/userData',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  userId,
                })
              }).then(res => res.json()).then(data =>{
                if (data.error) {
                    toaster(data.error);
                }else{
                    setData(data)
                }

                })
          
        }
    },[])
    if(userId === myId){
        return <MyProfile />
    }else{
           if(data && data.bio){
        const {bio , _id , name , email , photo} = data


        

class ClickToCopy extends React.Component {
    constructor(props) {
      super(props);
      this.textRef = React.createRef();
    }
  
    copyToClipboard = () => {
      const textArea = this.textRef.current;
      textArea.select();
      document.execCommand('copy');
      toaster('email copied');
    };
  
    render() {
      return (
        <div>
          <textarea
            ref={this.textRef}
            defaultValue={this.props.content}
            readOnly
            style={{ position: 'absolute', left: '-9999px' }}
          />
          <p className="profile-email" title='click to copy' onClick={this.copyToClipboard}>{email}</p>
        </div>
      );
    }
  }
        return (
            <div className='emails profile'>
                <div className="email-view-header">
                     <IconButton onClick={()=>window.history.back()}>
                        <ArrowBack sx={{fontSize:'20px',color:'black'}} />
                     </IconButton>
                </div>
                <ClickToCopy content={email} />
                <div className="profile-frame">
                    <img src={photo} alt="" />
                </div>
                <div className="profile-info">
                    <p className="profile-name">{name}</p>
                    <p className="profile-bio">{bio}</p>
                </div>
            </div>
        );
    }else{
        return(<Loader/>)
    } 
    }

};

export default Profile;