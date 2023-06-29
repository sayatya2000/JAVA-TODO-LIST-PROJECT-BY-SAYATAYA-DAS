const clickable = document.getElementById("add-option");
clickable.addEventListener("click", ToggleTaskModal);

var boxIndex = -1; // global
var singleTaskIndex = -1;

let myText = document.querySelector(".cheit");
myText.innerText = "No item in the Todo List";

// Task #1 : If item is entered , store it into an array of objects
Todos = [
  // Each Object inside Todos[] , represents an Task with 2 properties :
  // 1. Name of the Task
  // 2. Array of Items
];

// Todos is an Array that will store all Tasks.

renderItems();
// renderSingleItem();
function ToggleTaskModal() {
  const taskInput = document.getElementById("task-input");
  taskInput.value = "";
  // Acess the Element with the ID as "modal"
  const modal = document.getElementById("task-modal");
  // console.log(modal.style.display);
  if (modal.style.display === "block") {
    modal.style.display = "none";
    myText.innerText="";
  } 
  else {
    modal.style.display = "block";
    myText.innerText="";
  }
  taskInput.focus();
}

function ToggleSingelTaskModal() {

  let modal = document.getElementById("single-task-modal");
  // console.log(modal.style.display);
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
  // taskInput.focus();
  renderItems();
}

function ToggleItemModal() {
  // Acess the Element with the ID as "modal"
  const modal = document.getElementById("item-modal");
  const itemInput = document.getElementById("item-input");
  itemInput.value = "";
  // console.log(modal.style.display);
  if (modal.style.display === "block") {
    modal.style.display = "none";
  } else {
    modal.style.display = "block";
  }
  itemInput.focus();
}

function removeValueAtIndex(index) {
  console.log("Index to remove : ", index);
  // removes the value at 'index' from Todos
  const left = Todos.slice(0, index); // values from  '0' to 'index-1'
  console.log("Left : ", left);

  const right = Todos.slice(Number(index) + 1, Todos.length);
  console.log("Right : ", right); // values from 'index+1' to Todos.length -1

  Todos = left.concat(right);
  console.log("Combined : ", Todos);
}

function addTask() {

  console.log("Add Task Called");
  const taskInput = document.getElementById("task-input");
  const newObj = { name: taskInput.value, items: [] };
  Todos.push(newObj);
  renderItems();
  ToggleTaskModal();
}

function addItem() {
  console.log("Add Item Called for Index : ", boxIndex);
  const itemInput = document.getElementById("item-input");
  console.log("Item input given : ", itemInput.value);
  const newItemObject = { name: itemInput.value, isCompleted: false };
  Todos[boxIndex].items.push(newItemObject);
  renderItems();
  ToggleItemModal();
  renderSingleItem();
}
function renderSingleItem() {
  // const modal = document.getElementById("box");
  const singleContainer = document.getElementById("box");
  singleContainer.innerHTML= "";

  const singleTask = 
  document.getElementsByClassName("taskCard")[singleTaskIndex];
  singleContainer.appendChild(singleTask);
  renderItems();
}

// This Function displays all the data in athe Todos Array
function renderItems() {
  console.log("tODOS : ", Todos);
  var index = 0;

  // Each time the RenderItems Function is called , it will empty the taskcontainer
  const taskContainer = document.getElementById("taskContainer");
  taskContainer.innerHTML = "";

  for (var i = 0; i <= Todos.length - 1; i++) {
    var value = Todos[i];
    // each Taskcard will have an id equal to the value of the variable 'index'
    const taskCard = document.createElement("div");
    taskCard.classList.add("taskCard");
    taskCard.id = index;
    index++;

    const taskTitle = document.createElement("h2");
    taskTitle.classList.add("taskTitle");
    taskCard.appendChild(taskTitle);
    

    taskTitle.addEventListener("click", ()=>{
      ToggleSingelTaskModal();
      singleTaskIndex = taskTitle.parentElement.id;
      document.getElementById("single-task-name").innerText = Todos[singleTaskIndex].name;
      renderSingleItem();
      // renderItems();
    });
    taskTitle.innerText = value.name;
    
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("buttonContainer");

    // add
    // const addBtn = document.createElement("Button");
    const addBtn = document.createElement("img");
    // addBtn.innerText = "Add";
    addBtn.src = "./img/plus.png";
    addBtn.classList.add("plus-icon");
    addBtn.addEventListener("click", () => {
      ToggleItemModal();
      boxIndex = addBtn.parentElement.parentElement.id;
    });

    // del
    // const delBtn = document.createElement("Button");
    const delBtn = document.createElement("img");
    // delBtn.innerText = "Delete";
    delBtn.src = "./img/bin.png";
    delBtn.classList.add("bin-icon");
    delBtn.addEventListener("click", () => {
      // find the index of the element to be deleted from Todos Array
      const delIndex = delBtn.parentElement.parentElement.id;
      removeValueAtIndex(delIndex);
      renderItems();
      renderSingleItem()  
      // taskCard.style.display ='none';
      const modal = document.getElementById("single-task-modal");
      // console.log(modal.style.display);
      if (modal.style.display === "block") {
        modal.style.display = "none";
      } else {
        modal.style.display = "block";
      }
      // taskInput.focus();
      renderItems();
    });

    buttonContainer.appendChild(delBtn);
    buttonContainer.appendChild(addBtn);

    const itemList = document.createElement("ul");
    itemList.style.flex = "1";
    itemList.style.lineHeight = "35px";

    var k = 0;
    value.items.map((item) => {

      const markbtn = document.createElement("p");
      markbtn.innerText = "Mark done";
      // markbtn.style.display = "inline";
      markbtn.classList.add("markBtn");

      const item1 = document.createElement("li");
      item1.innerText = item.name;
      item1.id = k++;
      item1.appendChild(markbtn);

      markbtn.addEventListener("click", () => {
        item.isCompleted = !item.isCompleted;
        renderItems();
        if(!(singleTaskIndex === -1)){
          renderSingleItem();
        }
      });
      if (item.isCompleted) {
        item1.style.textDecoration = "line-through";
        item1.style.color = "red";
        markbtn.style.display = "none";
      }
      itemList.appendChild(item1);
    });

    taskContainer.appendChild(taskCard);
    taskCard.appendChild(itemList);
    taskCard.appendChild(buttonContainer);
  }
}
