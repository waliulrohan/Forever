import React, { useEffect, useState } from 'react';
import './tabs.css'
import EmailList from './EmailList';
import { toaster} from '../../config/toaster'
import FetchingLoader from '../../config/FetchingLoader';
const Starred = () => {
  const [emails , setEmails] = useState([])
  const [loading , setLoading] = useState(true)
  const token = sessionStorage.getItem('token');

  useEffect(()=>{
      if(token){
          fetch('https://forever-server-8try.onrender.com/email/starredEmails',{
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
              }
            }).then(res => res.json() ).then(data =>{
                setLoading(false)
              if (data.error) {
                  toaster(data.error);
              }else{
                  setEmails(data.emails)
              }

              })
        
      }
  },[])


  return (
      <div className='emails'>
               {loading && <FetchingLoader />}
          <div className="emails-selection">
              <p>Starred emails</p>
          </div>
          <div className="emails-list">
              {
                  emails.map(data => <EmailList data={data} key={data._id} />)
              }
              <div className="emails-footer flex-con">
                  <p>{emails.length} starred emails</p>
              </div>
          </div>
      </div>
    );
};

export default Starred;