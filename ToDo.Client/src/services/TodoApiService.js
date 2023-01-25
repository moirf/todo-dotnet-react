import { AuthenticationResult } from '@azure/msal-browser';
import axios, { AxiosInstance } from 'axios';

class TodoApiService {

    // constructor that requires a base URI.
    constructor(baseUri, authService) {
        if (!baseUri) {
            throw new Error('the base uri was not provided');
        }
        if (!authService) {
            throw new Error('the auth service was not provided');
        }

        this.AuthorizationService = authService;
        this.AuthenticatedApi = axios.create({
            baseURL: baseUri,
            // will inject auth header on-demand later as needed.
            headers: {
                'Content-Type': 'application/json',
            }
        });

    }
    // an api operation that gets the authenticated user's todo list
    getUserTodos(
        onStartCallback = null,
        onSuccessCallback = null,
        onFailureCallback = null) {

        onStartCallback && onStartCallback()
        return this.AuthorizationService.GetTodoApiToken()
            .then((response) => {
                return this.AuthenticatedApi.get('todo', {
                    headers: {
                        Authorization: 'Bearer ' + response.accessToken
                    }
                }).then((response) => {
                    onSuccessCallback && onSuccessCallback(response.data)
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

    // an api operation that posts a new todo to the authenticated user's todo list
    postUserTodo(
        data,
        onStartCallback = null,
        onSuccessCallback = null,
        onFailureCallback = null) {

        onStartCallback && onStartCallback()
        return this.AuthorizationService.GetTodoApiToken()
            .then((response) => {
                return this.AuthenticatedApi.post(
                    'todo',
                    data, {
                    headers: {
                        Authorization: 'Bearer ' + response.accessToken
                    }
                }).then((response) => {
                    onSuccessCallback && onSuccessCallback(response.data)
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

    // an api operation that updates an existing todo from the authenticated user's todo list
    putUserTodo(
        data,
        onStartCallback = null,
        onSuccessCallback = null,
        onFailureCallback = null) {

        onStartCallback && onStartCallback()
        return this.AuthorizationService.GetTodoApiToken()
            .then((response) => {
                return this.AuthenticatedApi.put(
                    'todo',
                    data, {
                    headers: {
                        Authorization: 'Bearer ' + response.accessToken
                    }
                }).then((response) => {
                    onSuccessCallback && onSuccessCallback()
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

    // an api operation that deletes an existing todo from the authenticated user's todo list
    deleteUserTodo(
        id,
        onStartCallback = null,
        onSuccessCallback = null,
        onFailureCallback = null) {

        onStartCallback && onStartCallback()
        return this.AuthorizationService.GetTodoApiToken()
            .then((response) => {
                return this.AuthenticatedApi.delete(
                    `todo/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + response.accessToken
                    }
                }).then((response) => {
                    onSuccessCallback && onSuccessCallback()
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

export default TodoApiService;