import React, { useEffect, useReducer } from 'react'
import { todoReducer } from '../08-useReducer/todoReducer'

const init = () => {
    return JSON.parse(localStorage.getItem('todos') || [])
}

// const initialState = [
//     {
//         id: new Date().getTime(),
//         description: 'Recolectar la piedra del alma',
//         done: false
//     },
// ]

export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducer, [] , init)

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos) || []);

    }, [todos])

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo,
        }
        console.log('Dispatching action:', action); // Verifica que la acción se está enviando
        dispatch(action);
    };

    const handleRemoveTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        })
    }


    return {
        handleNewTodo,
        handleRemoveTodo,
        handleToggleTodo,
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
    }
}
