//selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOp = document.querySelector(".filter-todo")

//event listeners
todoButton.addEventListener("click", addTodo)
todoList.addEventListener("click", deleteCheck)
filterOp.addEventListener("change", filter)

//functions
function addTodo(event) {

    //do not submit
    event.preventDefault()

    if (todoInput.value != "") {

        //create todo div
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")

        //create li
        const newTodo = document.createElement("li")
        newTodo.classList.add("todo-item")
        newTodo.innerText = todoInput.value
        todoDiv.appendChild(newTodo)

        //done btn
        const doneButton = document.createElement("button")
        doneButton.classList.add("done-btn")
        doneButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
        todoDiv.appendChild(doneButton)

        //delete btn
        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-btn")
        deleteButton.innerHTML = '<i class="fa-solid fa-circle-minus"></i>'
        todoDiv.appendChild(deleteButton)

        //append div
        todoList.appendChild(todoDiv)

        //clear input value
        todoInput.value = ""
    }
}

function deleteCheck(e) {
    const item = e.target
    if (item.classList[0] === "delete-btn") {
        const doItem = item.parentElement
        doItem.classList.add("swipe")
        doItem.addEventListener('transitionend', () => {
            doItem.remove()
        })
    }

    if (item.classList[0] === "done-btn") {
        const doItem = item.parentElement
        doItem.classList.toggle("completed")
    }
}

function filter(e) {
    const todos = [...todoList.childNodes];
    todos.forEach(function (todo) {
        if (todo.style != undefined && todo.style != null && todo.nodeType == Node.ELEMENT_NODE) {
            switch (e.target.value) {
                case "all":
                    todo.style.display = "flex"
                    break
                case "done":
                    if (todo.classList.contains("completed")) {
                        console.log('yes')
                        todo.style.display = "flex"
                    } else {
                        todo.style.display = "none"
                    }
                    break
                case "ongoing":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex"
                    } else {
                        todo.style.display = "none"
                    }
                    break
            }
        }
    });
}
