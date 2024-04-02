import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateOutlet = () => {
const token = sessionStorage.getItem('token')

return token ? <Outlet /> : <Navigate to="/auth" />;

};

export default PrivateOutlet;