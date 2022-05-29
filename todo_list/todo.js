const taskInput = document.querySelector(".task-input input"),
    filters = document.querySelectorAll(".filters span"),
    clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");
let editId;
let isEditedTask = false;
// getting data from chorme local storage
let todos = JSON.parse(localStorage.getItem("todos-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        // console.log(btn);
        // console.log(btn.className);
        showTodo(btn.id); 
    });
});

function showTodo(filter) {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {
            // console.log(id,todo);
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status|| filter =="all")
            {
                li += `<li class="task">
                        <label for="${id}">
                            <input onclick="updateStatus(this)" type="checkbox" name="" id="${id}" ${isCompleted}>
                            <p class="${isCompleted}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
                            <ul class="taskmenu">
                                <li onclick="editTask(${id}, '${todo.name}')"><i class="fa-solid fa-pen"></i>Edit</li>
                                <li onclick="deleteTask(${id})"><i class="fa-solid fa-trash"></i>Delete</li>
                            </ul>
                        </div>
                    </li>`;
                
            }
        });
    }
    taskBox.innerHTML = li||`<span>You don't have any content</span>`;
}
showTodo("all");
function showMenu(selectedTask) {
    // console.log(selectedTask)
    // getting task menu div
    let taskmenu = selectedTask.parentElement.lastElementChild;
    // console.log(taskmenu)
    taskmenu.classList.add("show");
    document.addEventListener("click", e => {
        // remove show if clicked
        if (e.target.tagName != "I" || e.target != selectedTask) {
            taskmenu.classList.remove("show");
        }
    });
}

function editTask(taskid, taskname) {
    // console.log(taskid,taskname);
    editId = taskid;
    isEditedTask = true;
    taskInput.value = taskname;
}

function deleteTask(task) {
    todos.splice(task, 1);
    localStorage.setItem("todos-list", JSON.stringify(todos));
    showTodo("all");
}

clearAll.addEventListener("click", ()=>{
    
    todos.splice(0, todos.length);
    localStorage.setItem("todos-list", JSON.stringify(todos));
    showTodo("all");
});

function updateStatus(selectedTasks) {
    // console.log(selectedTasks);
    //getting paragraph that clicked
    let taskname = selectedTasks.parentElement.lastElementChild;
    // console.log(taskname);
    if (selectedTasks.checked) {
        taskname.classList.add("checked");
        todos[selectedTasks.id].status = "completed";
    }
    else {
        taskname.classList.remove("checked");
        todos[selectedTasks.id].status = "pending";
    }
    localStorage.setItem("todos-list", JSON.stringify(todos));
}
taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();//trim remove extra whitespace 
    if (e.key == "Enter" && userTask) {
        // console.log(userTask);
        if (!isEditedTask) {
            if (!todos) {
                todos = [];//if no data exist pass empty array
            }
            let taskInfo = {
                name: userTask,
                status: "pending"
            };
            todos.push(taskInfo);//addding task in todos

        }
        else {
            isEditedTask = false;
            todos[editId].name = userTask;
        }
        taskInput.value = "";
        localStorage.setItem("todos-list", JSON.stringify(todos));
        showTodo("all");
    }
});
