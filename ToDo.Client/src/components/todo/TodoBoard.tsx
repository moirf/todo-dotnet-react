import React, { DispatchWithoutAction } from 'react'
import { Spinner, Row, Col} from 'reactstrap'
//import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import Todo from './Todo'
import TodoPriority from '../../utilities/TodoPriority'

interface IProps {
    isLoading: boolean,
    todos: [typeof Todo],
    todoColumns: [typeof Todo],
    dispatch: DispatchWithoutAction
}
const TodoBoard = (props: IProps) => {
    const { isLoading, todos, todoColumns, dispatch } = props;

    let highTodos:[typeof Todo] = [Todo]
    let medTodos:[typeof Todo] = [Todo]
    let lowTodos:[typeof Todo] = [Todo]

    if (!isLoading && todoColumns.length > 0) {
        // highTodos = todoColumns[TodoPriority.HIGH].map(todoId:number => todos.find(todo => todo.id === todoId))
        // medTodos = todoColumns[TodoPriority.MED].map(todoId => todos.find(todo => todo.id === todoId))
        // lowTodos = todoColumns[TodoPriority.LOW].map(todoId => todos.find(todo => todo.id === todoId))
    }

    return (
        <div className="todos-container" >
            {isLoading
                ? <Spinner className="loading-spinner" color="info" />
                : ""
                // <DragDropContext onDragEnd={(result) => dispatch({ type: "DRAG_TODO", payload: { result } })}>

                //     <div className="todo-board">
                //         <Row style={{ flex: 1 }}>
                //             <Col xs="12" md="4" className="todo-layout-column">
                //                 <Droppable className="flex-droppable" droppableId={`${TodoPriority.HIGH}`}>
                //                     {provided => (
                //                         <div
                //                             ref={provided.innerRef}
                //                             {...provided.droppableProps}
                //                             className="todo-board-container">

                //                             <h6 className="todo-board-column-heading">High Priority</h6>
                //                             <div className="todo-board-column">
                //                                 {highTodos.map((todo, index) =>
                //                                     <Todo
                //                                         key={todo.id}
                //                                         index={index}
                //                                         dispatch={dispatch}
                //                                         {...todo} />)}
                //                                 {provided.placeholder}
                //                             </div>
                //                         </div>
                //                     )}
                //                 </Droppable>
                //             </Col>
                //             <Col xs="12" md="4" className="todo-layout-column">
                //                 <Droppable className="flex-droppable" droppableId={`${TodoPriority.MED}`}>
                //                     {provided => (
                //                         <div
                //                             ref={provided.innerRef}
                //                             {...provided.droppableProps}
                //                             className="todo-board-container">

                //                             <h6 className="todo-board-column-heading">Medium Priority</h6>
                //                             <div className="todo-board-column">
                //                                 {medTodos.map((todo, index) =>
                //                                     <Todo
                //                                         key={todo.id}
                //                                         index={index}
                //                                         dispatch={dispatch}
                //                                         {...todo} />)}
                //                                 {provided.placeholder}
                //                             </div>
                //                         </div>
                //                     )}
                //                 </Droppable>
                //             </Col>
                //             <Col xs="12" md="4" className="todo-layout-column">
                //                 <Droppable className="flex-droppable" droppableId={`${TodoPriority.LOW}`}>
                //                     {provided => (
                //                         <div
                //                             ref={provided.innerRef}
                //                             {...provided.droppableProps}
                //                             className="todo-board-container">

                //                             <h6 className="todo-board-column-heading">Low Priority</h6>
                //                             <div className="todo-board-column">
                //                                 {lowTodos.map((todo, index) =>
                //                                     <Todo
                //                                         key={todo.id}
                //                                         index={index}
                //                                         dispatch={dispatch}
                //                                         {...todo} />)}
                //                                 {provided.placeholder}
                //                             </div>
                //                         </div>
                //                     )}
                //                 </Droppable>
                //             </Col>
                //         </Row>
                //     </div>
                // </DragDropContext >
            }
        </div>
    )
}

export default TodoBoard