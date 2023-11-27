import { 
    component$, 
    useStore, 
    useStyles$, 
    useContextProvider, 
    createContext,
} from "@builder.io/qwik";

import Todos from "~/components/todos/todos";
import indexStyles from "./index.css?inline";

// Todos Context
export const TodosContext = createContext("todos-context");

export default component$(() => {
    const todos = useStore({
        todos: []
    }, {
        recursive: true // TODO: Explain how adding this will make everything work, 
        // do without at first and with
    });

    useContextProvider(TodosContext, todos);

    useStyles$(indexStyles);
    return (
        <main>
            <Todos />
        </main>
    )
})