import React from 'react';
import { Navigate } from 'react-router-dom'

export const TabAuth = () => {
    // if (authService.account) {
    //     return <Navigate to="/home" />;
    // }
    // authService.SignIn()

    return (
        <div className="small-root">
            <h5 className="page-title">Authenticating...</h5>
        </div>
    );
}