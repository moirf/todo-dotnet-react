interface ITodo {
    id: number
    task: string
    dueDate: Date
    completed: boolean
  }
  
  interface TodoProps {
    todo: ITodo
  }
  
  type ApiDataType = {
    todos: ITodo[]
  }