import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { useLocation } from 'react-router-dom'

export const Error = () => {
    const location = useLocation()

    return (
        <div className="large-root">
            <h1 className="error-title">Error</h1>
            <Alert color="danger">
                {location.state.message}
            </Alert>
            
        </div>
    )
    
}