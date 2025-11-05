import html from "../core.js";
import Todoitem from "./Todoitem.js";
import { connect } from "../store.js";

const connector = connect()
function Todolist({todos}){
    return html`
        <section class="main">
				<input id="toggle-all" class="toggle-all" type="checkbox">
				<label for="toggle-all">Mark all as complete</label>
				<ul class="todo-list">
                ${todos.map(todo => Todoitem({todo}))}
				</ul>
			</section>
    `
}

export default connector(Todolist)