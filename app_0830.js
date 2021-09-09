let section = document.querySelector("section");
let add = document.querySelector("form button");
add.addEventListener("click", e => {
    // prevent form from being submitted
    e.preventDefault();

    // get the input values
    let form = e.target.parentElement;
    let todoText = form.children[0].value;

    if (todoText === "") {
        alert("Please Enter Text.");
        return;
    }

    // create todo
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText;
    todo.appendChild(text);

    // check button
    let completeBtn = document.createElement("button");
    completeBtn.classList.add("complete");
    completeBtn.innerHTML = '<i class="far fa-check-square "></i>';
    completeBtn.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.classList.toggle("done");
    })
    let trashBtn = document.createElement("button");
    trashBtn.classList.add("trash");
    trashBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    trashBtn.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        todoItem.addEventListener("animationend", () => {
            todoItem.remove();
        })
        todoItem.style.animation = "scaleDown 0.3s forwards";
    })

    todo.appendChild(completeBtn);
    todo.appendChild(trashBtn);

    todo.style.animation = "scaleUp 0.3s forwards";

    // create an object
    let myTodo = {
        todoText: todoText
    }

    // store data into an array of objects
    let myList = localStorage.getItem("list");
    if (myList == null) {
        localStorage.setItem("list", JSON.stringify([myTodo]));
    } else {
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify([myListArray]));
    }
    console.log(localStorage.getItem("list"));


    form.children[0].value = ""; //clear input text
    section.appendChild(todo);
})

// load localStorage data
let myList = localStorage.getItem("list");
if (myList !== null) {
    let myListArray = JSON.parse(myList);
    myListArray.forEach(item => {
        let todo = document.createElement("div");
        todo.classList.add("todo");
        let text = document.createElement("p");
        text.innerText = item.todoText;
        todo.appendChild(text);
        section.appendChild(todo);
    })

}