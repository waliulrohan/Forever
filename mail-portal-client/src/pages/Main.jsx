import React, { useState } from 'react';
import './pages.css'

import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Emails from '../components/tabs/Emails';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Main = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const toggleDrawer=()=>{
        setOpenDrawer(!openDrawer)
    }
    return (
        <div className='main'>
            <Navbar toggleDrawer={toggleDrawer} />
            <Outlet />
            <SideBar openDrawer={openDrawer}  toggleDrawer={toggleDrawer} />
            <div>
                <Toaster
                position="top-right"
                reverseOrder={false}
                />
            </div>
        </div>
    );
};

export default Main;