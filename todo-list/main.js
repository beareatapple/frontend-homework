import './style.css';

/**
 * @param {HTMLFormElement} form
 * @return {any}
 */
function getFormData(form) {
    return Object.fromEntries(new FormData(form).entries());
}

function addTodo(section) {
    return (event) => {
        event.preventDefault();

        const todoText = getFormData(event.currentTarget)['todo-text'];
        if (todoText === "") {
            alert("Please Enter some Text.");
            return;
        }

        const todo = Todo(todoText)
        todo.style.animation = "scaleUp 0.3s forwards";

        saveData({ todoText });
        section.append(todo);

        event.currentTarget.reset()
    }
}

function saveData(todoItem) {
    const myList = localStorage.getItem("list");

    if (!myList) {
        localStorage.setItem("list", JSON.stringify([todoItem]));

        return
    }

    const myListArray = JSON.parse(myList);
    myListArray.push(todoItem);
    localStorage.setItem("list", JSON.stringify(myListArray));
}


/**
 *  <div class="todo">
 *    <span class="todo-text"></span>
 *  </div>
 * @param {string} todoText
 * @return {HTMLDivElement}
 */
function Todo(todoText) {
    // wrapper
    const todo = document.createElement("div");
    todo.classList.add("todo", "flex", "justify-between", "items-center", "px-4", "py-2", "m-2", "bg-blue-100", "rounded-lg");

    // text
    const text = document.createElement("span");
    text.innerText = todoText;
    todo.appendChild(text);

    // button area
    const buttonArea = document.createElement("div");
    buttonArea.appendChild(CompleteButton());
    buttonArea.appendChild(TrashButton());
    todo.appendChild(buttonArea);

    return todo;
}

/**
 * <button class="complete">
 *    <i class="fas fa-check"></i>
 * </button>
 */
function CompleteButton() {
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';

    completeButton.addEventListener("click", (event) => {
        const todoItem = event.target.parentElement.parentElement;
        todoItem.classList.toggle("done");
    });

    return completeButton;
}

/**
 * <button class="trash">
 *   <i class="fas fa-trash"></i>
 * </button>
 */
function TrashButton() {
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';

    trashButton.addEventListener("click", (event) => {
        const todoItem = event.target.parentElement.parentElement;

        todoItem.style.animation = "scaleDown 0.3s forwards";

        todoItem.addEventListener("animationend", () => {
            // remove from local storage
            const text = todoItem.children[0].innerText;
            const myListArray = JSON.parse(localStorage.getItem("list"));

            //@todo: refactor
            // hint: filter
            /* myListArray.forEach((item, index) => {
                if (item.todoText == text) {
                    myListArray.splice(index, 1);
                }
            }); */

            // update local storage
            localStorage.setItem("list", JSON.stringify(myListArray.filter(item => item.todoText !== text)));

            // remove item
            todoItem.remove();
        })
    })

    return trashButton;
}

function loadData(section) {
    const myList = localStorage.getItem("list");

    if (!myList) return;

    const myListArray = JSON.parse(myList);

    section.append(
        ...myListArray.map(({ todoText }) => Todo(todoText))
    );
}

// entry point
function main() {
    const section = document.querySelector("section");
    loadData(section);

    const form = document.querySelector(".todo-input");
    form.addEventListener("submit", addTodo(section));
}

main();