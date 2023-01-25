import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import TodoPriority from '../../utilities/TodoPriority'
import {
    Card, CardBody, CardTitle, CardHeader, Modal,
    ModalHeader, ModalBody, ModalFooter, Button,
    Input
} from 'reactstrap'
import TodoEditForm from './TodoEditForm'

const Todo = ({ id, index, task, dueDate, priority, completed, dispatch }) => {
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const toggleDeleteModal = () => setDeleteModal(!deleteModal)
    const toggleEditModal = () => setEditModal(!editModal)

    let todoBorderColor
    switch (priority) {
        case TodoPriority.LOW:
            todoBorderColor = "green"
            break;
        case TodoPriority.MED:
            todoBorderColor = "orange"
            break;
        case TodoPriority.HIGH:
            todoBorderColor = "red"
            break;
    }
    const overdue = Date.now() > dueDate.getTime() && new Date().getDate() > dueDate.getDate()
    const backgroundColor = completed ? "#CCC" : "white"
    const todoStyle = { backgroundColor: backgroundColor, borderLeftColor: todoBorderColor }
    const textStyle = completed ? { flex: "85%", margin: 0, textDecoration: "line-through" } : { flex: "85%", margin: 0 }
    return (
        <Draggable draggableId={`${id}`} index={index}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>

                    <TodoEditForm id={id} dispatch={dispatch} editModal={editModal} task={task} dueDate={dueDate} priority={priority} toggle={toggleEditModal} />
                    <Modal isOpen={deleteModal}>
                        <ModalHeader close={<br />} toggle={toggleDeleteModal}><span style={{ color: "red" }}>Delete Todo</span></ModalHeader>
                        <ModalBody>
                            Are you sure you want to delete this todo?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={() => dispatch({ type: "DELETE_CONFIRM", payload: { id } })}>
                                Delete
                            </Button>
                            <Button color="secondary" onClick={() => toggleDeleteModal()} >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>

                    <Card className="todo" style={todoStyle}>
                        <CardHeader>
                            <div style={{ display: "flex" }}>
                                <div style={{ flex: "74%" }} >
                                    {overdue && <h6 className="todo-text" style={{ color: "red" }}>Overdue</h6>}
                                    <h6 className="todo-text" style={{ flex: "78%" }}>Due Date: {`${dueDate.getDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`}</h6>
                                </div>
                                <div style={{ flex: "22%" }}>
                                    <i
                                        className="bi-pencil-square"
                                        style={{ marginLeft: 10, cursor: "pointer", fontSize: 20 }}
                                        onClick={toggleEditModal} />
                                    <i
                                        className="bi-trash"
                                        style={{ marginLeft: 10, cursor: "pointer", fontSize: 20 }}
                                        onClick={toggleDeleteModal} />
                                </div>
                            </div>
                        </CardHeader>
                        <CardBody onClick={() => dispatch({ type: "TOGGLE_COMPLETE", payload: { id } })}>
                            <CardTitle>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <p style={textStyle}>{task}</p>
                                    <div style={{ display: "flex", flex: "20%", height: 30, justifyContent: "center", alignItems: "center" }}>
                                        <input style={{ width: 18, height: 18 }} type="checkbox" checked={completed} />
                                    </div>
                                </div>
                            </CardTitle>
                        </CardBody>
                    </Card>
                </div>
            )}
        </Draggable>
    )
}

export default Todo