import { AuthenticationResult } from '@azure/msal-browser';
import axios, { AxiosInstance } from 'axios';

class CalendarApiService {

    constructor(baseUri, authService) {
        if (!baseUri) {
            throw new Error('the base uri was not provided');
        }
        if (!authService) {
            throw new Error('the auth service was not provided');
        }
        this.baseUri = baseUri
        this.AuthorizationService = authService
        this.AuthenticatedApi = axios.create({
            baseUrl: baseUri,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    getCalendarEvents(
        onStartCallback = null,
        onSuccessCallback = null,
        onFailureCallback = null) {

        onStartCallback && onStartCallback()
        return this.AuthorizationService.GetCalendarApiToken()
            .then((response) => {
                return this.AuthenticatedApi.get(`${this.baseUri}/me/events`, {
                    headers: {
                        Authorization: 'Bearer ' + response.accessToken
                    }
                }).then((response) => {
                    let events = response.value.map(event => {
                        return {
                            subject: event.subject,
                            start: event.start.dateTime,
                            end: event.end.dateTime,
                            location: event.location.displayName
                        }
                    });
                    console.log(events)
                    onSuccessCallback && onSuccessCallback(events)
                }).catch((error) => {
                    if (error.response) {
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(`${error.response.status}, ${error.response.data}`)
                        if (error.response.status === 403 || error.response.status >= 500)
                            onFailureCallback && onFailureCallback(error)
                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(`${error.request}`)
                        onFailureCallback && onFailureCallback(error)
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                        onFailureCallback && onFailureCallback(error)
                    }
                    console.log(error.config);
                });
            })
            .catch((error) => {
                console.log(`${error}`)
                onFailureCallback && onFailureCallback(error)
            });
    }
}

export default CalendarApiService