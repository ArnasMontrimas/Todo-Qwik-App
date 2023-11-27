import { component$, useStyles$ } from "@builder.io/qwik";

import headerStyles from "./header.css?inline";

export default component$(() => {
    useStyles$(headerStyles);

    return (
        <header>
            <h1>
                Todos
            </h1>
        </header>
    )
})