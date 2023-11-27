import { $, component$, useSignal, useStore, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./todo-form.css?inline";

const TodoForm = component$(( { addTodo, validateName } ) => {
    const todo = useStore({ name: "", completed: false });

    const disabled = useSignal(true);
    const inputRef = useSignal(null);

    const resetState = $(
        () => {
            inputRef.value.value = null;
            todo.name = "";
            todo.completed = false;
            disabled.value = true
        }
    )
    
    const handleInput = $(
        async (e) => {
            todo.name = e.target.value;
            
            const validName = await validateName(e.target.value);
            if (validName) disabled.value = false;
            else disabled.value = true
        }
    )

    useStylesScoped$(styles);
    return (
        <form> {}
            <label htmlFor="todoName">Name</label>
            <input 
                ref={inputRef}
                onInput$={(e) => handleInput(e)}
                name="todoName" 
                type="text"
            />
            <input 
                preventdefault:click // This will prevent the default behavior of the "click" event.
                value="Add Todo"
                type="submit" 
                onClick$={() => { 
                    addTodo(todo, resetState)
                    // resetState(); // Reset State
                }}
                disabled={disabled.value}
            />
        </form>
    )
});

export default TodoForm;