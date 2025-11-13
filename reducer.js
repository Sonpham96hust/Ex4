import storage from "./ulti/storage.js"


const init ={
    todos: storage.get(),
    filter: 'all',
    filters:{
      all: () => true,
      active: todo => !todo.completed,
      completed: todo => todo.completed
    },
    editIndex : null
}

// const actions = {
//     add({todos}, title){
//         todos.push({title, completed: false})
//         storage.set(todos)
//     }
// }
export default function reducer(state = init, action, args) {
    switch (action) {
    case 'add': {
      const [title] = args;

      if (title) {
        const newTodos = [
          ...state.todos,
          { title, completed: false }
        ];

        // Lưu vào localStorage
        storage.set(newTodos);

        return {
          ...state,
          todos: newTodos
        };
      }

      return state;
    }
        case 'toggle':{
            const [index] = args;
                const newTodos = [...state.todos];
                newTodos[index] = {...newTodos[index], completed: !newTodos[index].completed}
                storage.set(newTodos);
                return {
                    ...state,
                    todos: newTodos
                };
        }

        case 'toggleAll':{
            const [completed] =args;
              const newTodo = [...state.todos];
              newTodo.forEach(todo => {
                todo.completed = completed;
              })
              storage.set(newTodo)
              return{
                ...state,
                todos: newTodo
              }
        }

        case 'destroy':{
            const [index] = args;
            const newtodo = [...state.todos];
            newtodo.splice(index,1);
            storage.set(newtodo)
            return{
              ...state,
              todos: newtodo
            }
        }

        case 'switchFilter':{
            const [filter] = args;
            state.filter = filter;
  
        }
        case 'clearCompleted':{
            state.todos= state.todos.filter(state.filters.active)
            storage.set(state.todos)
        }      

        case 'startEdit':{
          const [index] = args;
            state.editIndex = index;
            return{
              ...state,
              editIndex: index
            }
        }
        case 'endEdit':{
          const [newTitle] = args; // Lấy giá trị mới từ input
          const newTodos = [...state.todos];

    if (state.editIndex !== null) {
        // Cập nhật title của todo đang edit
        if(newTitle)
        {
          newTodos[state.editIndex] = {
            ...newTodos[state.editIndex],
            title: newTitle
        };

        storage.set(newTodos); // Lưu vào localStorage

        return {
            ...state,
            todos: newTodos,
            editIndex: null // reset editIndex sau khi edit xong
        };
        }
        else{
            const newtodo = [...state.todos];
            newtodo.splice(state.editIndex,1);
            storage.set(newtodo)
            return{
              ...state,
              todos: newtodo,
              editIndex: null
            }
        }
        
    }

    return state;
  }
      case 'cancelEdit':{
          return{
            ...state,
            editIndex: null
          }
      }    
        default:
            return state;
    }
}