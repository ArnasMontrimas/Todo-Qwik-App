import { component$, useStyles$ } from "@builder.io/qwik";

import footerStyles from "./footer.css?inline";

export default component$(() => {
    useStyles$(footerStyles);

    return (<footer>
        <small> 
            <strong>By: </strong> 
            NeoCodex   
        </small>
    </footer>)
})