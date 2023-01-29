import React, { useEffect, useContext, useReducer, useRef } from "react"
import { Alert, Row, Col, Container } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import TodoBoardReducer from '../../reducers/TodoBoardReducer'
import TodoBoard from './TodoBoard'
import AutoCompleteTodoInput from "./AutoCompleteTodoInput"

const TodoHome = ({ apiService }) => {
    const [state, dispatch] = useReducer(TodoBoardReducer,
        {
            todos: [],
            todoColumns: [],
            apiUpdates: [],
            error: null,
            displaySaving: false,
            isLoading: false,
            isSaving: false
        })

    const isMounted = useRef(false)
    const timeoutRef = useRef(-1)

    useEffect(() => {
        apiService.getUserTodos(
            () => dispatch({ type: "SET_LOADING" }),
            (data) => dispatch({ type: "API_GET", payload: data }),
            (err) => dispatch({ type: "ERROR", payload: err }))
    }, [])

    useEffect(() => {
        if (isMounted.current) {
            let timeoutId
            if (state.isSaving) {
                clearTimeout(timeoutRef.current)
                !state.displaySaving && dispatch({ type: "TOGGLE_DISPLAY_SAVING" })
            }
            else {
                timeoutId = setTimeout(() => dispatch({ type: "TOGGLE_DISPLAY_SAVING" }), 1000)
                timeoutRef.current = timeoutId
            }

        } else { isMounted.current = true }
    }, [state.isSaving])

    useEffect(() => {
        const apiUpdates = state.apiUpdates
        const onStartCallback       = () => dispatch({ type: "SET_SAVING" })
        const onSuccessCallback     = () => dispatch({ type: "API_UPDATE" })
        const onPostSuccessCallback = (id) => dispatch({ type: "API_POST", payload: id })
        const onFailCallback        = (err) => dispatch({ type: "ERROR", payload: err })

        apiUpdates.forEach(apiUpdate => {
            switch (apiUpdate.type) {
                case "POST":
                    apiService.postUserTodo(apiUpdate.data, onStartCallback, onPostSuccessCallback, onFailCallback)
                    break;
                case "DELETE":
                    apiService.deleteUserTodo(apiUpdate.data, onStartCallback, onSuccessCallback, onFailCallback)
                    break
                case "PUT":
                    apiService.putUserTodo(apiUpdate.data, onStartCallback, onSuccessCallback, onFailCallback)
                    break
                default:
                    dispatch({ type: "ERROR", payload: { message: "Unrecognized update type should be one of: POST, DELETE, PUT" } })
            }
        })
    }, [state.apiUpdates])

    if (state.error) {
        return <Redirect to={{
            pathname: "/error",
            state: { message: state.error }
        }} />
    }

    return (
        <div className="todo-home large-root">
            {state.displaySaving && <div className="saving-bar">
                <p className="todo-text" style={{ marginBottom: 0, color: "white" }}><b>Saving...</b></p>
            </div>}
            <div style={{ position: "relative", paddingBottom: 20 }}>
            </div>

            <Container className="todo-home-container">
                <Row>
                    <Col xs="12" md="4">
                        <Alert
                            style={{ marginRight: 20 }}
                            color="info">{"Please enter input in the form:"}
                            <br /><br /> <b>task:</b> {"<task>"}
                            <br /> <b>duedate:</b> {"DD/MM/YYYY"}
                            <br /> <b>priority:</b> {"1|2|3"}
                            <br /><br /> {"Separator #"}</Alert>
                    </Col>
                    <Col xs="12" md="8">
                        <AutoCompleteTodoInput onSubmit={(input) => dispatch({ type: "SUBMIT", payload: input })} />
                    </Col>
                </Row>
                <Row>
                    <Col xs="12">
                        <TodoBoard isLoading={state.isLoading} todos={state.todos} todoColumns={state.todoColumns} dispatch={dispatch} />
                    </Col>
                </Row>
            </Container>
            
        </div >
    )
}

export default TodoHome