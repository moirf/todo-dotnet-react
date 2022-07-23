import React, { Component, createContext } from 'react';
import { Container, Button } from 'reactstrap';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import TodoHome from './todo/TodoHome';
import TodoApiService from '../services/TodoApiService';

export const Home = ({ authService, appSettings }) => {
    const apiService = new TodoApiService(appSettings.GetWebApiBaseUri(), authService)

    return (
        <div>
            {authService.account
                ? <div>
                    <h1 className="todo-title">Todo Manager </h1>
                    <TodoHome apiService={apiService}/>
                 </div>
                : <div>
                     <h5 className="todo-title">Please sign-in to see your account data</h5>
                 </div>}
        </div>
    )
}

