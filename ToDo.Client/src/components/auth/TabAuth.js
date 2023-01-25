import React from 'react';
import { Redirect } from 'react-router-dom'

export const TabAuth = ({ authService }) => {
    if (authService.account) {
        return <Redirect to={{
            pathname: "/home"
        }} />
    }
    authService.SignIn()

    return (
        <div className="small-root">
            <h5 className="page-title">Authenticating...</h5>
        </div>
    );
}