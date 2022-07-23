import 'bootstrap/dist/css/bootstrap.css';
import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { Alert } from 'reactstrap';
import registerServiceWorker from './registerServiceWorker';
import AuthService from './services/AuthService';
import AppSettingsService from './services/AppSettingsService';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const PathContext = createContext()

export default PathContext

let appSettings = new AppSettingsService();
let authService = new AuthService(appSettings);

authService.HandlePageLoadEvent().then(() => {

    ReactDOM.render(
        <PathContext.Provider value={{ baseUrl }} >
            <Router basename={baseUrl}>
                <App authService={authService} appSettings={appSettings} />
            </Router>
        </PathContext.Provider>,
        rootElement);
}).catch((error) => {
    ReactDOM.render(
        <div>
            <h1 className="error-title">Error</h1>
            <Alert color="danger">
                {error.stack}
            </Alert>
        </div>,
        rootElement)
})


registerServiceWorker();

