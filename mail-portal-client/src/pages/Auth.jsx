import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

const Auth = () => {
    return (
        <div className='auth'>
            <Outlet />
            <div>
                <Toaster
                position="top-right"
                reverseOrder={false}
                />
            </div>
        </div>
    );
};

export default Auth;