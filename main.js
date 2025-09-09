const modal = document.querySelector('.modal-container');
const openBtns = document.querySelectorAll('.details'); 
const closeBtn = document.querySelector('.close-modal');

openBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });
});

if (closeBtn) {
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    modal.style.display = 'none';
  });
}

modal.addEventListener('click', () => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});


function showOrder(status) {
  const sections = ['pending', 'active', 'delivered', 'cancelled'];
  sections.forEach(s => {
    document.getElementById(`${s}-section`).style.display = s === status ? 'grid' : 'none';
  });
  
 document.getElementById('orders-heading').innerText =
 status.charAt(0).toUpperCase() + status.slice(1) + ' Orders';
 document.getElementById('orders-desc').innerText = `Manage ${status} orders`;

 const orderCount = document.querySelectorAll(`#${status}-section om-order-card`).length;
 document.getElementById('orders-count').innerText = `${orderCount} ${status} orders`;

 sections.forEach(s => {
  document.getElementById(`tab-${s}`).classList.toggle('active', s === status);
 });
}



// // const { createElement } = require("react");

// const app = document.getElementById("app");

// // const container = document.createElement("div");
// // container.id = "main";
// // container.classList.add("container");
// // app.append(container);

// // const header = document.createElement("h2");
// // header.textContent = "To-Do List"
// // container.append(header);

// // const toDoList = document.createElement("ul");
// // toDoList.id = "todo-list";
// // toDoList.classList.add("list-group", "pt-3", "pb-2");
// // container.append(toDoList);

// // const toDoControls = document.createElement("div");
// // toDoControls.id = ("todo-controls");
// // toDoControls.classList.add("input-group");
// // document.getElementById("todo-list").before(toDoControls);

// // const footer = document.createElement("p");
// // footer.textContent = "I love you larabels"
// // document.getElementById("todo-list").after(footer);

// const toDoButton = document.createElement("button")
// toDoButton.id = "btn-todo";
// toDoButton.classList.add("btn", "btn-outline-primary");
// toDoButton.textContent = "Add";
// toDoButton.addEventListener("clicl", () => {
//     let itemInput = document.getElementById('text-todo');
//     let toDoList = document.getElementById('todo-list');

//     let newItem = document.createElement('li');
//     newItem.classList.add("list-group-item");
//     newItem.textContent = " " + itemInput.value;

//     addRemoveBtn(newItem)

//     toDoList.append(newItem)
//     itemInput.value = '';

// });

// c    => {
//     let removeBtn = document.createElement('button');
//     removeBtn.innerHTML = "<i class='bi bi-trash'></i>";
//     removeBtn.type = "button";
//     removeBtn.classList.add("btn", "btn-sm", "btn-outline-danger");
//     removeBtn.addEventListener("click", () => {
//         listIte.remove();
//     })  
//     listItem.prepend(removeBtn)
// }


























// // const app = document.getElementById("task-list");

// // // Create the header
// // const header = document.createElement("h2");
// // header.id = "task-header"; // Use a different id than the ul
// // header.classList.add("Task");
// // header.textContent = "My Task";
// // app.before(header); // Insert header before the ul

// // // Create list items
// // const list = document.createElement("li");
// // const list2 = document.createElement("li");
// // list.textContent = "Learn Javascript";
// // list2.textContent = "Practice DOM";

// // // Append list items inside the ul
// // app.append(list, list2);


// // const btnEventListener = document.getElementById("btn-event-listener");
// // btnEventListener.addEventListener("click", (e) => {
// //     console.log("Event Object");
// //     console.log(e);
    
    
// // });

// // function newEventHandler () {
// //     alert("This is a new event handler");
// // }

// // btnEventListener.addEventListener("click", newEventHandler);
// // btnEventListener.removeEventListener("click", newEventHandler);

// // const linkGoogle = document.getElementById("link-google");
// // linkGoogle.addEventListener("click", (e) => {
// //     (e).preventDefault();
// // });





// // function createCustomElement(element) {
// //     const event = new customEvent("customEvent", {
// //         detail:{
// //             customEventProp1: "customEventProp1",
// //             customeEvenetProp2: true,
// //             customEventProp3: () => {
// //                 console.log("some functions of customeEvent"); 
// //                 },
// //         }
// //     });
// //     element.dispatchEvent(event);
// // }

// // const btnEventListener = document.getElementById("btn-event-listener");

// // btnEventListener.addEventListener("click", (e) => {
// //     createCustomEvent(e.target);
// // });

// // btnEventListener.addEventListener("customEvent", (e) => {
// //     console.log(e.detail);
    
// // });