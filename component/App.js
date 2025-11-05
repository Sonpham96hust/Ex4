import html from "../core.js";
import Header from "../component/Header.js";
import Todolist from "../component/Todolist.js";
import Footer from "../component/Footer.js";

function App(){
    return html`
        <section class="todoapp">
            ${Header()}
            ${Todolist()}
            ${Footer()}
        </section>
    `
}

export default App