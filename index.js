class Todo {
  constructor(title) {
    this.id = Date.now();
    this.title = title;
    this.completed = false;
  }

  toggleCompleted() {
    this.completed = this.completed ? false : true
  
  }
}



class TodoList {
  constructor() {
    this.todos = [];
    }
    
    addTodo(title) {
      const newTodo = new Todo(title);
      this.todos.push(newTodo);
      this.renderTodos();
     
  }

  removeTodo(id) {
     this.todos = this.todos.filter(todo => parseInt(id) !== todo.id);
    this.renderTodos();
  }

  clearCompleted() {
    
    
    this.todos = this.todos.filter(todo => !todo.completed);
    this.renderTodos();
    
    if ( this.todos.length == 0) {
          console.log(this.todos.length)
          document.querySelector(".clear-btn").style.display = 'none'
        }
  }

  renderTodos() {
    var todolist = document.querySelector('.todo-list')
      todolist.innerHTML = '';
        
      
      this.todos.forEach(todo => {
      const li = document.createElement('li');
      const btn1 = document.createElement('button');
      const p = document.createElement('p');
      const btn2 = document.createElement('button');


      li.className = 'todo-item';
      li.id = todo.id;
      p.textContent = todo.title;

      btn1.textContent = '';
      btn2.textContent = '';

      btn1.classList.add('done-btn') 
      btn2.classList.add('delete-btn') 
      // li.textContent = todo.title;

      
      btn1.addEventListener('click', () => {
        todo.toggleCompleted();
        this.renderTodos();
        document.querySelector(".clear-btn").style.display = ''
        ;
        });
        
        btn2.addEventListener('click', (e) => {
          var id = e.target.parentNode.id
          this.removeTodo(id);
          this.renderTodos();
          });
          
          if (todo.completed) {
            p.classList.add('completed');
            btn1.classList.add('done-btn-clicked') 
          }
     

      li.appendChild(btn1);
      li.appendChild(p);
      li.appendChild(btn2);
      document.querySelector(".todo-list").appendChild(li);
    });
  

  }
}

// Create a new TodoList instance
const todoList = new TodoList();



// Event listeners
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

todoInput.addEventListener('keypress', event => {
  if (event.key === 'Enter' && todoInput.value !== "") {
    todoList.addTodo(todoInput.value);
    todoInput.value = '';
  }
});

addTodoBtn.addEventListener('click', () => {
  if (todoInput.value !== "") {
    todoList.addTodo(todoInput.value.slice(0, 30));
    todoInput.value = '';
  }
});

clearCompletedBtn.addEventListener('click', () => {
  todoList.clearCompleted();
 
});

// Initial render
todoList.renderTodos();