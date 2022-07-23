import React, { useState } from "react"
import DateParser from '../../utilities/DateParser'
import TodoPriority from '../../utilities/TodoPriority'
import {
    Modal, ModalHeader, ModalBody,
    ModalFooter, Button, Form, FormGroup,
    ButtonGroup
} from 'reactstrap'

const TodoEditForm = ({ id, dispatch, editModal, task, dueDate, priority, toggle}) => {
    const [editTask, setEditTask] = useState(task)
    const [editDueDate, setEditDueDate] = useState(DateParser.getDateString(dueDate))
    const [editPriority, setEditPriority] = useState(priority)
    const [focusAfterClose, setFocusAfterClose] = useState(true);

    const resetFormFields = () => {
        setEditTask(task)
        setEditDueDate(DateParser.getDateString(dueDate))
        setEditPriority(priority)
    }

    const updateDueDate = (numDays) => {
        const date = new Date(editDueDate)
        // By default parsing the output of the date input field
        // produces a date that lags by 1 day
        date.setDate(date.getDate() + 1)
        date.setDate(date.getDate() + numDays)
        setEditDueDate(DateParser.getDateString(date))
    }

    return (
        <Modal isOpen={editModal} returnFocusAfterClose={focusAfterClose}>
            <Form onSubmit={(event) => { event.preventDefault(); toggle(); dispatch({ type: "EDIT_CONFIRM", payload: { todo: { id, editTask, editDueDate, editPriority } } }) }}>
                <ModalHeader close={<br />} toggle={toggle}>Edit Todo</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label htmlFor="editTask" style={{ width: 100 }}>Task: </label>
                        <input
                            id="editTask"
                            name="editTask"
                            type="text"
                            value={editTask}
                            onChange={(event) => setEditTask(event.target.value)}
                            style={{ width: 300 }}
                            required />
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <label htmlFor="editDueDate" style={{ width: 100 }}>Due Date: </label>
                        <input
                            id="editDueDate"
                            name="editName"
                            type="date"
                            min={DateParser.getCurrentDateString()}
                            value={editDueDate}
                            onChange={(event) => setEditDueDate(event.target.value)} />
                        <br />
                        <div style={{ marginLeft: 95 }}>
                            <Button onClick={() => updateDueDate(1)} style={{ margin: 5 }} size="sm" type="button" color="secondary">Tomorrow</Button>
                            <Button onClick={() => updateDueDate(7)} style={{ margin: 5 }} size="sm" type="button" color="secondary">Next week</Button>
                        </div>
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <label htmlFor="editPriority" style={{ width: 100 }}>Priority: </label>
                        <ButtonGroup>
                            <Button style={{ marginRight: 10 }} size="sm" outline color="danger"  onClick={() => setEditPriority(TodoPriority.HIGH)} active={editPriority === TodoPriority.HIGH}><b>High</b></Button>
                            <Button style={{ marginRight: 10 }} size="sm" outline color="warning" onClick={() => setEditPriority(TodoPriority.MED)} active={editPriority === TodoPriority.MED}><b>Medium</b></Button>
                            <Button style={{ marginRight: 10 }}  size="sm" outline color="success" onClick={() => setEditPriority(TodoPriority.LOW)} active={editPriority === TodoPriority.LOW}><b>Low</b></Button>
                        </ButtonGroup>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary">
                        Save
                    </Button>
                    <Button color="secondary" type="button" onClick={() => { toggle(); resetFormFields() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}

export default TodoEditForm