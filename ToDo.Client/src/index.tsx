import React from 'react'
import ReactDOM from 'react-dom';
import {App} from './App';
import './themes.css'

ReactDOM.render(
    <React.StrictMode>
        <App name='todo app' />
    </React.StrictMode>,
    document.getElementById('root'));
