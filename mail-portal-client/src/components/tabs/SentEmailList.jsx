import React from 'react';
import { useNavigate } from 'react-router-dom';

const SentEmailList = ({data}) => {
    const navigate= useNavigate(); 
    const {_id,to,from,subject,createdAt}=data;
   const timeStirng = new Date(createdAt);
    return (
        <div className='email-list-item' onClick={()=> navigate(`/sent-mail/${_id}`)}>
            <p className="list-from">{to.name}</p>
            <p className="list-subject">{subject}</p>
            <div className="list-time">
               <p >{timeStirng.toLocaleDateString()} <br />{timeStirng.toLocaleTimeString()}</p>
            </div>
  
        </div>
    );
};

export default SentEmailList;