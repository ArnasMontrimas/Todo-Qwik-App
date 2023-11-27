import { component$, useClientEffect$, useContext, useSignal, useStylesScoped$, $ } from "@builder.io/qwik";
import { TodosContext } from "~/routes";

import todoStyle from "./todo.css?inline";

const Todo = component$(( { 
        todo, 
        index, 
        toggleTodo, 
        removeTodo, 
        updateTodo, 
        validateName 
} ) => {
    const ctx = useContext(TodosContext);

    const todoName = useSignal(todo.name); // TODO: First do with "", then this way
    const updateMode = useSignal(false);
    const disabled = useSignal(false);
    const checkboxRef = useSignal(null);

    useClientEffect$(({ track }) => { // TODO: Explain why useClientEffect$ instead of useTask$
        track(() => ctx.todos.length);
        if (!todo.completed) { // TODO: Explain this a little aswell
            checkboxRef.value.checked = false;
        }
    })

    // Good segway into saying you can multiple usClientEffects, to track multiple values
    // I think this is because a re-render happens and the checkbox resets to being unchecked
    useClientEffect$(({ track }) => {
        track(() => updateMode.value)
        if (todo.completed) { // TODO: Explain this a little aswell
            checkboxRef.value.checked = true;
        }
    })

    const handleInput = $(
        async (e) => {
            todoName.value = e.target.value
                    
            const validName = await validateName(e.target.value);
            if (validName) disabled.value = false;
            else disabled.value = true
        }
    )

    const renameTodo = $(
        () => {
            updateMode.value = true;
        }
    )
    
    const resetState = $(
        () => {
            updateMode.value = false;
        }
    )

    useStylesScoped$(todoStyle);
    return (
        <div class={todo.completed ? "done" : ""} id="container" >
            <div class="todo-container">
                <div>
                    { updateMode.value
                        ? <input type="text" value={todo.name} onInput$={(e) => handleInput(e)} />
                        : todo.name
                    }
                </div>
                <div>
                    { updateMode.value ? null : <input ref={checkboxRef} type="checkbox" onChange$={() => toggleTodo(index)} /> }
                </div>
            </div>
            <div class="button-container">
                { updateMode.value 
                    ?  <button 
                            onClick$={() => updateTodo(index, todoName.value, resetState)}
                            disabled={disabled.value}
                        >
                            Save
                        </button>
                    : <button onClick$={renameTodo}>Rename</button>
                }
                <button onClick$={() => removeTodo(index)} >Remove</button>
            </div>
        </div>
    )
})

export default Todo;