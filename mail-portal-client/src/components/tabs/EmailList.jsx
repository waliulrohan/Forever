import React from 'react';
import {useNavigate, useParams} from 'react-router-dom'

const EmailList = ({data}) => {
    const navigate= useNavigate()   
    const {_id,to,from,subject,createdAt}=data;
   const timeStirng = new Date(createdAt);
    return (
        <div className='email-list-item' onClick={()=> navigate(`/mail/${_id}`)}>
            <p className="list-from">{from.name}</p>
            <p className="list-subject">{subject}</p>
            <div className="list-time">
               <p >{timeStirng.toLocaleDateString()} <br />{timeStirng.toLocaleTimeString()}</p>
            </div>
        </div>
    );
};

export default EmailList;