import React, { useState } from 'react';
//import { Redirect } from 'react-router-dom';
import TodoHome from './todo/TodoHome';
//import TodoApiService from '../services/TodoApiService';
//import CalendarApiService from '../services/CalendarApiService';

export const Home = () => {
    // const todoApiService = new TodoApiService(appSettings.GetWebApiBaseUri(), authService)
    // const calendarApiService = new CalendarApiService(appSettings.GetGraphApiBaseUri(), authService)

    // calendarApiService.getCalendarEvents()

    return (
        <div>
            <div>
                <h1 className="page-title">Todo Manager </h1>
                {/* <TodoHome apiService={todoApiService} /> */}
            </div>
        </div>
    )
}

