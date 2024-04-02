import React, { useEffect, useState } from 'react';
import './tabs.css'
import EmailList from './EmailList';
import { toaster} from '../../config/toaster'
import FetchingLoader from '../../config/FetchingLoader';
const Bin = () => {
  const [emails , setEmails] = useState([])
  const token = sessionStorage.getItem('token');
  const [loading , setLoading] = useState(true)
  useEffect(()=>{
      if(token){
          fetch('http://localhost:5000/email/myBinEmails',{
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
              }
            }).then(res => res.json() ).then(data =>{
              if (data.error) {
                  toaster(data.error);
              }else{
                setLoading(false)
                  setEmails(data.emails)
              }

              })
        
      }
  },[])


  return (
      <div className='emails'>
               {loading && <FetchingLoader />}
          <div className="emails-selection">
              <p>Bin</p>
          </div>
          <div className="emails-list">
              {
                  emails.map(data => <EmailList data={data} key={data._id} />)
              }
              <div className="emails-footer flex-con">
                  <p>{emails.length} emails in bin</p>
              </div>
          </div>
      </div>
    );
};

export default Bin;