var taskArr = [];

const updateView = () => {

    const tasksList = document.getElementById("tasksList");

    var child = tasksList.lastChild;
    while(child) {
        tasksList.removeChild(child);
        child = tasksList.lastChild;
    }

    taskArr.forEach((Element, index) => {

        const newTask = document.createElement("div");
        newTask.setAttribute("class", "task-div");

        const taskText = document.createElement("div");
        taskText.setAttribute("class", Element.isDone ? "task-text task-completed" : "task-text");
        taskText.innerHTML = (index + 1) + ". " + Element.task;

        const taskControls = document.createElement("div");
        taskControls.setAttribute("class", "task-controls");


        //Vytváření edit-button
        const taskEdit = document.createElement("button");
        taskEdit.innerHTML = "Edit";
        taskEdit.setAttribute("id", index + "edit");
        //css edit button
        taskEdit.setAttribute("class", "task-btn task-btn-edit");
        //zachytává event myšky
        taskEdit.addEventListener("click", (event) => editTask(event.target.id));

        //Vytváření delete-button
        const taskDelete = document.createElement("button");
        taskDelete.innerHTML = "Delete";
        taskDelete.setAttribute("id", index + "delete");
        taskDelete.setAttribute("class", "task-btn task-btn-delete");
        taskDelete.addEventListener("click", (event) => deleteTask(event.target.id));

        const taskDo = document.createElement("button");
        taskDo.innerHTML = Element.isDone ? "Undo" : "Done";
        taskDo.setAttribute("id", index + "do");
        taskDo.setAttribute("class", "task-btn task-btn-do");
        taskDo.addEventListener("click", (event) => doTask(event.target.id));

        taskControls.appendChild(taskEdit);
        taskControls.appendChild(taskDelete);
        taskControls.appendChild(taskDo);

        newTask.appendChild(taskText);
        newTask.appendChild(taskControls);

        tasksList.appendChild(newTask);
    });
}

const addTask = (isDone) => {

    const task = document.getElementById("task-input").value;
    if(task === null || task.trim() === "") return;
    taskArr.push({task, isDone});
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();

    const taskInput = document.getElementById("task-input");
    taskInput.value = "";
}

const editTask = (id) => {

    const taskIndex = parseInt(id[0]);
    const taskText = taskArr[taskIndex].task;
    taskArr.splice(taskIndex, 1);
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();

    const taskInput = document.getElementById("task-input");
    taskInput.value = taskText;
}

const deleteTask = (id) => {

    const taskIndex = parseInt(id[0]);
    taskArr.splice(taskIndex, 1);
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();
}

const doTask = (id) => {

    const taskIndex = parseInt(id[0]);
    taskArr[taskIndex].isDone = !taskArr[taskIndex].isDone;
    localStorage.setItem("savedTasks", JSON.stringify(taskArr));
    updateView();
}

document.addEventListener("DOMContentLoaded", () => {

    const savedTasks = JSON.parse(localStorage.getItem("savedTasks"));
    if(savedTasks !== null) taskArr = [...savedTasks];
    updateView();
})

document.getElementById("task-submit-btn").addEventListener("click", () => addTask(false));

document.getElementById("task-clear-btn").addEventListener("click", () => {

    localStorage.clear();
    taskArr = [];
    updateView();
})

















/*


const todoForm = document.querySelector ('.todo-form');
// select the input box
const todoInput = document.querySelector ('.todo-input');
const todoItemsList = document.querySelector ('.todo-items');
// array which stores every todos
let todos = [];
// add an eventListener on form , and listen for submit event
todoForm.addEventListener ('submit',
function (event) {
// Prevent the page form reloading when submitting the form
event.preventDefault();
addTodo (todoInput.value); // call addtodo function with input box current value
}
);
// function to add todo
function addTodo (item) {
  // if item is not empty
  if (item !== '') {
    // make a todo object , which has id , name , and completed properties
    
    const todo ={ 
      id: Date.now(),
      name:item,
      completed: false
    };
// then add it to todos array
todos.puse(todo);
addToLocalStorahe(todos); // then store it in localStorage

// finally clear the input box value
todoInput.value = '';
}
}
// function to render given todos to screen
function renderTodos (todos) {
// clear everything inside < ul > with class = " todo - items "
todoItemsList.innerHTML= '';
// run through each item inside todos
todos.forEach(function(item) {
// check if the item is completed
const checked = item.completed ? 'checked': null;
// make a < li > element and fill it
// < li > < / li >
const li = document.createElement('li');
// < li class = " item " > < / li >
li.setAttribute ('class', 'item') ;
// < li class = " item " date - key = " 20200708 " > < / li >
li.setAttribute ('data-key', item.id);
// if item is completed , then add a class to < li > called ' checked ' which will add line - through style
if ( item.completed == true ) {
li.class.add ( ' checked ' ) ;
}

li.innerHTML = `
<input type="checkbox" class="checkbox" ${checked}>
${item.name}
<button class="delete-button">X</button>
`;

// finally add the < li > to the < ul >
todoItemsList.append(li);
});
}
// function to add todos to local storage
function addToLocalStorahe(todos){
// conver the array to string then store it .
localStorage.setItem('todos', JSON.stringify(todos));
// render them to screen
renderTodos(todos);
}
// function helps to get everything form local storage
function getFormLocalStorage(){
const reference = localStorage.getItem('todos');
// if reference exists

if(reference){
// converts back to array and store it in todos array
todos = JSON.parse(reference);
renderTodos(todos);
}
}

// toggle the value to completed and not completed
function toggle(id){
todos.forEach(function(item){
// use == not === , because here types are different. One is number and outher is string
if ( item.id == id){
// toggle the value
item.completed =! item.completed;          
}
})
addToLocalStorage(todos)
}
//deletes a todo form todos array, then updates localStorage and renders update list to screen
function deleteTodo(id){
//filter out the <li> with the id and update the todos array
todos =todos.filter(function(item){
return item.id != id;
});
//update the localStorage
addToLocalStorahe();

}

// initially get everyhing form localStorage
getFormLocalStorage();

//after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox

todoItemsList.addEventListener ('click', function(event){
// click if the event is on checkbox
if (event.target.type === 'checkbox') { 
// toogle the state 
toggle(event.target.parentElement.getAttribute('data-key'));
}  
// check if that is a delete - button
if (event.target.classList.container('delete-button')){
// get id from data - key Attribute's value of parent < li > where the delete - button is
deleteTodo(event.targer.parentElement.getAttribute('data-key'));
}
});

*/