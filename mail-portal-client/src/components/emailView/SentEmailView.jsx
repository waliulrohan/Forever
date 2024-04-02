import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteOutline, ArrowBack, Undo } from '@mui/icons-material';
import './emailview.css'
import { IconButton } from '@mui/material';
import { toaster} from '../../config/toaster'
import {confirmAlert} from 'react-confirm-alert'
import ImageViewer from './ImageViewer';
import Loader from '../../config/Loader'

const SentEmailView = () => {
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
    const {_id , body , createdAt , from , to , subject , attachment} = email;
    const timeStirng = new Date(createdAt);

    const undoEmail =()=>{
        if(token && emailId){
            fetch('http://localhost:5000/email/undoEmail',{
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
                    window.history.back()
                    toaster(data.message)
                }

                })
          
        }
    }

    // undo confirm
const handleUndo = () => {
    confirmAlert({
        title: 'Undo email',
        message: 'Are you sure?',
        buttons: [
            {
                label: 'Yes',
                onClick: () => {
                     undoEmail()
                }
            },
            {
                label: 'No',
                onClick: () => toaster("Okay.")
            }
        ]
    });
  };

    if(email && from){
        return (
            <div className='email-view'>
                <div className="email-view-header">
                     <IconButton onClick={()=>window.history.back()}>
                        <ArrowBack sx={{fontSize:'20px',color:'black'}} />
                     </IconButton>
                     <IconButton onClick={handleUndo}>
                        <Undo  sx={{fontSize:'20px',color:'black'}} />
                     </IconButton>
                </div>
                <div className="email-view-main">
                    <div className="email-info">
                         <div className="email-info-sub">
                            <p>{subject}</p>
                         </div>
                         <div className="email-info-contact">
                            <div className="contact-frame" onClick={()=> navigate(`/profile/${to._id}`)}>
                                <img src={to.photo} alt="dp.." />
                            </div>
                            <div className="contact-address">
                                 <p  onClick={()=> navigate(`/profile/${to._id}`)}>{to.name} <span className="contact-text">~{to.email}~</span></p>
                                 <p className="contact-text">From me</p>
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
        return(<Loader/>)
    }
};

export default SentEmailView;