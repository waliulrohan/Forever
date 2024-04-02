import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteOutline, ArrowBack, Star, StarOutline, Close } from '@mui/icons-material';
import './emailview.css'
import { IconButton } from '@mui/material';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { toast } from 'react-hot-toast';
import { toaster } from '../../config/toaster';
import ImageViewer from './ImageViewer';
import Loader from '../../config/Loader';
const EmailView = () => {
    const {emailId} = useParams();
    const token = sessionStorage.getItem('token')
    const [email , setEmail] = useState({})
    const[isZoom , setIsZoom] =useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        if(token && emailId){
            fetch('http://localhost:5000/email/singleEmail',{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  emailId
                })
              }).then(res => res.json() ).then(data =>{
                if (data.error) {
                    toaster(data.error);
                }else{
                    setEmail(data.email[0])
                }

                })
          
        }
    },[])
    const {_id , body , createdAt , from , to , subject , bin , starred , attachment} = email;
    const timeStirng = new Date(createdAt);


    const binEmail =()=>{
        if(token && emailId){
            fetch('http://localhost:5000/email/binEmail',{
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  emailId
                })
              }).then(res => res.json() ).then(data =>{
                if (data.error) {
                    toaster(data.error);
                }else{
                    window.history.back()
                    toaster(data.message)
                }

                })
          
        }
    }
    const restoreEmail =()=>{
        if(token && emailId){
            fetch('http://localhost:5000/email/restoreEmail',{
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  emailId
                })
              }).then(res => res.json() ).then(data =>{
                if (data.error) {
                    toaster(data.error)
                }else{
                    window.history.back()
                    toaster(data.message)
                }

                })
          
        }
    }
    const addStar =()=>{
        if(token && emailId){
            fetch('http://localhost:5000/email/addStar',{
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  emailId
                })
              }).then(res => res.json() ).then(data =>{
                if (data.error) {
                    toaster(data.message);
                }else{
                    toaster(data.message);
                    setEmail(data.email);
                }

                })
          
        }
    }
    const removeStar =()=>{
        if(token && emailId){
            fetch('http://localhost:5000/email/removeStar',{
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  'authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                  emailId
                })
              }).then(res => res.json() ).then(data =>{
                if (data.error) {
                    toaster(data.message);
                }else{
                    toaster(data.message);
                    setEmail(data.email);
                }

                })
          
        }
    }

    if(email && from){
        return (
            <div className='email-view'>
                <div className="email-view-header">
                     <IconButton onClick={()=>window.history.back()}>
                        <ArrowBack sx={{fontSize:'20px',color:'black'}} />
                     </IconButton>
                    {
                        !bin?

                     <IconButton onClick={()=> binEmail()}>
                        <DeleteOutline  sx={{fontSize:'20px',color:'black'}} />
                     </IconButton>
                     :
                     <IconButton onClick={()=> restoreEmail()}>
                        <RestoreFromTrashIcon   sx={{fontSize:'20px',color:'black'}} />
                     </IconButton>
                    }
                    {
                        starred ?

                     <IconButton onClick={()=> removeStar()}>
                        <Star  sx={{fontSize:'20px',color:'black'}} />
                     </IconButton>
                     :
                     <IconButton onClick={()=> addStar()}>
                        <StarOutline   sx={{fontSize:'20px',color:'black'}} />
                     </IconButton>
                    }
                </div>
                <div className="email-view-main">
                    <div className="email-info">
                         <div className="email-info-sub">
                            <p>{subject}</p>
                         </div>
                         <div className="email-info-contact">
                            <div className="contact-frame" onClick={()=> navigate(`/profile/${from._id}`)}>
                                <img src={from.photo} alt="dp.." />
                            </div>
                            <div className="contact-address">
                                 <p onClick={()=> navigate(`/profile/${from._id}`)}>{from.name} <span className="contact-text">~{from.email}~</span></p>
                                 <p className="contact-text">to me</p>
                            </div>
                            <div className="contact-date">
                            <p >{timeStirng.toLocaleDateString()} <br />{timeStirng.toLocaleTimeString()}</p>
                            </div>
                         </div>
                    </div>
    
                    <div className="email-content">
                        <div className="content-text" >
                            <p>{body}</p>
                        </div>

                        
                       {attachment && 
                       <div className="content-attachment">
                            <img onClick={()=> setIsZoom(true)} src={attachment} alt="" />
                            {
                                isZoom && <ImageViewer url={attachment}  setIsZoom={setIsZoom}/>
                            }
                        </div>}
                    </div>
                </div>
            </div>
        );
    }else{
        return(<Loader />)
    }
};

export default EmailView;