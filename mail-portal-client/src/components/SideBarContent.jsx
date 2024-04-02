import React, { useState } from 'react';
import {CreateOutlined} from '@mui/icons-material'
import './components.css'
import { SIDEBAR_DATA } from '../config/SideBarConfig';
import {useNavigate, useParams} from 'react-router-dom'
import Compose from './Compose';
const SideBarContent = () => {
    const navigate = useNavigate();

    const [openCompose , setOpenCompose]= useState(false)

    const pathname = window.location.pathname;
  
    const parts = pathname.split('/');
    const tab = parts[parts.length - 1]; 
    return (
        <div className='sidebar-content'>
            <button className="compose-button" onClick={() => setOpenCompose(true)}>
               <CreateOutlined style={{ marginRight: 10, verticalAlign: 'middle' }}  /><span style={{ verticalAlign: 'middle', fontWeight:'500', fontSize:'.95rem' }}>Compose</span>
            </button>
            <div className="sidebar-icons">
                {SIDEBAR_DATA.map(data=>(
                    <div key={data.title} style={tab === data.route ? {backgroundColor: "#d3e3fd"} : {}}  className='sidebar-icon-btn' onClick={()=> navigate(`/${data.route}`)}>
                        <data.icon fontSize="small" style={{ marginRight: 5, verticalAlign: 'middle' }}  /><span style={{ verticalAlign: 'middle',fontWeight:'500', marginLeft:15,fontSize:'.9rem' }}>{data.title}</span>
                    </div>
                ))}
            </div>
            <Compose openCompose={openCompose} setOpenCompose={setOpenCompose} />
        </div>
    );
};

export default SideBarContent;