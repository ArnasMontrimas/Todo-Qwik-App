import { $, component$, useContext } from "@builder.io/qwik";
import { TodosContext } from "~/routes";
import Todo from "./todo/todo";
import TodoForm from "./todo-form/todo-form";


const Todos = component$(() => {
    const ctx = useContext(TodosContext);

    const toggleTodo = $(
        (index) => {
            ctx.todos[index].completed = !ctx.todos[index].completed;
        }
    )
    
    const removeTodo = $(
        (index) => {
            ctx.todos.splice(index, 1); // 2nd parameter means remove one item only
        }
    )
    
    const cleanupTodos = $(
        () => {
            ctx.todos = ctx.todos.filter((todo) => todo.completed != true);
        }
    )
    
    const addTodo = $(
        (todo, callback) => {
            const newTodo = { name: "", completed: false };
            newTodo.name = todo.name;
            ctx.todos.push(newTodo);

            callback();
        }
    )
    
    const updateTodo = $(
        (index, newValue, callback) => {
            ctx.todos[index].name = newValue;
            callback();
        }
    )
        
    const validateName = $(
        (name) => {
            return name.length >= 3;
        }
    )

    return (
        <>
            <div>
                <button onClick$={cleanupTodos} disabled={ctx.todos.length <= 0} >Cleanup</button>
            </div>
            <br />
            <div>
                { ctx.todos.map((todo, index) => (
                    <Todo 
                        key={index} 
                        index={index}
                        todo={todo}
                        toggleTodo={toggleTodo}
                        removeTodo={removeTodo}
                        updateTodo={updateTodo}
                        validateName={validateName}
                    />
                ))}
            </div>
            <br />
            <TodoForm 
                addTodo={addTodo} 
                validateName={validateName}
            />
        </>
    )

});

export default Todos;