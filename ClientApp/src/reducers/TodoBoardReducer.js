import TodoPriority from "../utilities/TodoPriority"
import DateParser from "../utilities/DateParser"
import TodoInfoHandler from "../utilities/TodoInfoHandler"

const TodoBoardReducer = (state, action) => {
    const _todosAddIndex = (todos, todoColumns = state.todoColumns) => {
        return todos.map(todo => { return _todoAddIndex(todo, todoColumns) })
    }
    const _todoAddIndex = (todo, todoColumns = state.todoColumns) => {
        return { ...todo, columnIndex: todoColumns[todo.priority].findIndex(id => id == todo.id) }
    }

    switch (action.type) {
        /***************************************************************************** API UPDATES *****************************************************************************************/
        case "API_GET": {
            console.log(action.payload)
            const todos = action.payload
            // Dates are received as formatted strings so convert into date object and store in todos array
            const todosDate = todos.map(todo => { return { ...todo, dueDate: new Date(todo.dueDate) } })

            // Create columns for each priority and input todo ids 
            const todoColumns = []
            for (let priority = TodoPriority.LOW; priority <= TodoPriority.HIGH; priority++) {
                todoColumns.push(todosDate.filter(todo => todo.priority == priority).map(todo => todo.id))
            }
            return { ...state, todos: todosDate, todoColumns: todoColumns, isLoading: false }
        }
        case "API_UPDATE": {
            return { ...state, isSaving: false }
        }

        case "API_POST": {
            const todo_id = action.payload;
            const newTodos = state.todos.map(todo => todo.id === 0 ? { ...todo, id: todo_id } : todo )
            const todoColumns = state.todoColumns
            const todo = newTodos.find(todo => todo.id == todo_id)

            todoColumns[todo.priority] = todoColumns[todo.priority].map(id => id === 0 ? todo_id : id)

            return {...state, todos: newTodos, todoColumns: todoColumns, isSaving: false}

        }
    /****************************************************************************************************************************************************************************************/
    /***************************************************************************** TODO UPDATES *********************************************************************************************/
        case "DRAG_TODO": {
            // Get destination and source column ids as well as id of todo that
            // was dragged
            const { destination, source, draggableId } = action.payload.result
            const todoColumns = state.todoColumns
            const todoId = parseInt(draggableId)
            let newTodos
            let updateTodos = []

            //No destination 
            if (!destination)
                return { ...state }

            // Todo was dropped in same location as before
            if (destination.droppableId === source.droppableId
                && destination.index === source.index)
                return { ...state }

            // Perform column manipulation on priority columns to remove todo from old location 
            // and add to new location
            const sourcePriority = parseInt(source.droppableId)
            const destinationPriority = parseInt(destination.droppableId)
            todoColumns[sourcePriority].splice(source.index, 1)
            todoColumns[destinationPriority].splice(destination.index, 0, todoId)

            newTodos = state.todos.map(todo => {
                // Only send updates to API for todos in source or destination columns
                let update = false
                if (todo.priority == sourcePriority || todo.priority == destinationPriority)
                    update = true

                // Todo is equal to dragged todo
                if (todo.id === todoId) {
                    update && updateTodos.push({ ...todo, priority: destinationPriority })
                    return { ...todo, priority: destinationPriority }
                }
                update && updateTodos.push(todo)
                return todo
            })
            return {
                ...state,
                apiUpdates: [{ type: "PUT", data: _todosAddIndex(updateTodos, todoColumns) }],
                todos: newTodos,
                todoColumns: todoColumns
            }
        }
        case "SUBMIT": {
            const { task, dueDate, priority, error } = TodoInfoHandler.parse(action.payload)
            if (error) { return { ...state, error: `Unexpected error when parsing todo info: ${error.message}`} }

            // New todos will have an invalid id initially, column index is set to 0 so that todo is appended to top of list
            const newTodo = { id: 0, task: task, columnIndex: 0, dueDate: dueDate, priority: priority, completed: false }          
            const newTodos = [newTodo, ...state.todos]

            // Update todos in column with priority of new todo by incrementing column indices.
            // For now set the new todo id to -1 in the todoColumn until we receive updated todo id from
            // API
            const todoColumns = state.todoColumns         
            const updateTodos = todoColumns[priority]
                .map((id, index) => { return { ...newTodos.find(todo => todo.id === id), columnIndex: index + 1} })
            todoColumns[priority] = [0, ...state.todoColumns[priority]]
            
            return {
                ...state,
                todos: newTodos,
                todoColumns: todoColumns,
                taskStringError: "",
                apiUpdates: [{ type: "POST", data: newTodo },
                         { type: "PUT", data: updateTodos }],
                taskString: "",
                dueDate: null
            }
        }

        case "EDIT_CONFIRM": {
            let { id, editTask, editDueDate, editPriority } = action.payload.todo

            // Handle potentially different input types for due date and priority
            editDueDate  = (typeof (editDueDate) == "string") ? DateParser.parseFromInput(editDueDate) : editDueDate
            editPriority = (typeof (editPriority) == "string" ? parseInt(editPriority) : editPriority)

            const todoColumns = state.todoColumns
            const oldTodo = state.todos.find(todo => todo.id === id)
            const updateCols = oldTodo.priority !== editPriority 
            let updateTodos = []

            const editedTodos = state.todos.map(todo => {
                let update = updateCols && (todo.priority == oldTodo.priority || todo.priority == editPriority)
                
                if (todo.id === id) {
                    if (updateCols) {
                        const oldIndex = todoColumns[todo.priority].findIndex(todoId => todoId == id)
                        todoColumns[todo.priority].splice(oldIndex, 1)
                        todoColumns[editPriority].splice(0, 0, id)
                    }
                    const newTodo = { ...todo, task: editTask, dueDate: editDueDate, priority: editPriority }
                    updateTodos.push(newTodo)
                    return newTodo
                }
                else {
                    update && updateTodos.push(todo)
                    return { ...todo }
                }
            })
            return {
                ...state,
                apiUpdates: [{ type: "PUT", data: _todosAddIndex(updateTodos, todoColumns) }],
                todos: editedTodos,
                todoColumns: todoColumns
            }
        }
        case "DELETE_CONFIRM": {
            const todoPriority = state.todos.find(todo => todo.id == action.payload.id).priority
            const filterTodos = state.todos.filter(todo => todo.id !== action.payload.id)
            const todoColumns = state.todoColumns

            // Filter todo column to remove deleted todo and shift position of todos
            todoColumns[todoPriority] = todoColumns[todoPriority].filter(todoId => todoId !== action.payload.id)
            const updateTodos = todoColumns[todoPriority]
                .map((id, index) => { return { ...filterTodos.find(todo => todo.id === id), columnIndex: index } })

            return {
                ...state,
                apiUpdates: [
                    { type: "DELETE", data: action.payload.id },
                    { type: "PUT", data: updateTodos }],
                todos: filterTodos
            }
        }
        case "TOGGLE_COMPLETE": {
            const newTodos = state.todos.map(todo => {
                return { ...todo, completed: todo.id == action.payload.id ? !todo.completed : todo.completed }
            })
            const updateTodo = newTodos.find(todo => todo.id === action.payload.id)
            return { ...state, apiUpdates: [{ type: "PUT", data: _todosAddIndex([updateTodo]) }], todos: newTodos }
        }
    /****************************************************************************************************************************************************************************************/
    /***************************************************************************** PAGE UPDATES *********************************************************************************************/
        case "TOGGLE_DISPLAY_SAVING": {
            return { ...state, displaySaving: !state.displaySaving }
        }
        case "SET_LOADING": {
            return { ...state, isLoading: true }
        }
        case "SET_SAVING": {
            return { ...state, isSaving: true }
        }
        case "ERROR": {
            const error = action.payload
            if (typeof (error) == "string")
                return { ...state, error: error }
            else if (typeof (error) == "object" && error instanceof Error)
                return { ...state, error: error.message }
            else
                return { ...state, error: "Unhandled error: Error supplied to dispatch method not understood" }
        }

    /****************************************************************************************************************************************************************************************/
    }
}
export default TodoBoardReducer