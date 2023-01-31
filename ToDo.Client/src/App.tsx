import React, { Component, useEffect, useState } from 'react';
import './custom.css'
import './bootstrap-icons.css'
import { Layout } from './components/Layout';
import TodoApi from './services/TodoApi'

interface IProps {
    todoApi: TodoApi,

}
export default function App(props: IProps) {

    const [todos, setTodos] = useState<ITodo[]>([])

    const fetchTodos = (): void => {
        props.todoApi.getTodos()
            .then(({ data: { todos } }: ITodo[] | any) => {console.log(todos); setTodos(todos)})
            .catch((err: Error) => console.log(err))
    }

    useEffect(() => {
        fetchTodos();
    }, []
    )



    return (
        <div>
            Hello....
            {todos.map((todo: ITodo) => (
                <p>todo._id</p>
            ))}
        </div>
    );
}
