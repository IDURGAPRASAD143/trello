// imports
import {
  addNewList,
  updateListName,
  deleteList,
} from "./api_calls.js";
import { addNewCardFunction } from "./cards.js";

// Close the "Add New List" input section
function closeNewFunction() {
  document.getElementById("add-new-section").style.display = "none";
  document.getElementById("add-list").style.display = "flex";
}

// Create the "Add New Card" UI for a given list
function addCardOption(listId) {
  let addCardContainer = document.createElement("div");
  addCardContainer.id = "add-card-container";

  let addCard = document.createElement("div");
  addCard.className = "add-card-container";
  addCard.textContent = "+ Add a card";

  let addNewSection = document.createElement("div");
  addNewSection.className = "add-new-card-options";

  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter card name";
  input.className = "card-name-input";

  let optionsDiv = document.createElement("div");
  optionsDiv.id = "add-new-card-options";
  optionsDiv.style.display = "flex";

  let addNewCardButton = document.createElement("div");
  addNewCardButton.className = "add-new-card-option";
  addNewCardButton.textContent = "Add";

  let closeNewCardButton = document.createElement("div");
  closeNewCardButton.className = "close-new-card-option";
  closeNewCardButton.textContent = "Close";

  optionsDiv.appendChild(addNewCardButton);
  optionsDiv.appendChild(closeNewCardButton);

  addNewSection.appendChild(input);
  addNewSection.appendChild(optionsDiv);

  addCardContainer.appendChild(addCard);
  addCardContainer.appendChild(addNewSection);
  // event listener for add button
  addCard.addEventListener("click", () => {
    addNewSection.style.display = "block";
    addCard.style.display = "none";
  });
  // event listener for close  button
  closeNewCardButton.addEventListener("click", () => {
    input.value = "";
    addNewSection.style.display = "none";
    addCard.style.display = "flex";
  });
  // event listener for add new card button
  addNewCardButton.addEventListener("click", () => {
    let name = input.value.trim();
    if (name !== "") {
      addNewCardFunction(name, listId);
      input.value = "";
      addNewSection.style.display = "none";
      addCard.style.display = "flex";
    }
  });

  return addCardContainer;
}

// Delete a list from Trello
function deleteListFunction(name, listId) {
  if (confirm(`Do you want to archive ${name}`)) {
    deleteList(listId);
    let list = document.getElementById(listId);
    let board = list.parentElement;
    board.removeChild(list);
  }
}

// Edit a list name
function editListName(list, listName) {
  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter list name";
  input.className = "edit-list-name-input";
  input.value = listName.textContent;
  listName.textContent = "";
  listName.appendChild(input);
  // event listener for input edit
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      listName.textContent = input.value || "Untitled";
      updateListName(list.id, listName.textContent);
    }
  });
  input.addEventListener("blur", () => {
    listName.textContent = input.value || "Untitled";
    updateListName(list.id, listName.textContent);
  });
}

// Create a new list element and add to board
export async function createList(name, listId) {
  let list = document.createElement("div");
  list.id = listId;
  list.className = "list-contents";

  let listHeader = document.createElement("div");
  listHeader.className = "list-header";

  let listDelete = document.createElement("i");
  listDelete.className = "fa-solid fa-archive list-delete";

  listDelete.addEventListener("click", () => {
    deleteListFunction(name, listId);
  });

  let listName = document.createElement("div");
  listName.textContent = name;
  listName.className = "list-name";
  // event listener for list name edit
  listName.addEventListener("dblclick", () => {
    editListName(list, listName);
  });

  listHeader.append(listName, listDelete);
  list.appendChild(listHeader);

  let addCardContainer = addCardOption(listId);
  list.appendChild(addCardContainer);

  let lists = document.getElementById("lists");
  lists.appendChild(list);
}

// Create a new list and its UI after adding to Trello
async function addNewListFunction(name) {
  let listData = await addNewList(name);
  let listId = listData.id;
  createList(name, listId);
}

// Display the list input UI and bind add/close events
async function createNewList() {
  let inputSection = document.getElementById("add-new-section");
  inputSection.style.display = "block";
  document.getElementById("add-list").style.display = "none";

  let listName = document.querySelector("#add-new-section input");
  listName.placeholder = "Enter list name";
  let addNewListButton = document.getElementById("add-new-list");
  // event listener for add new list  button
  addNewListButton.addEventListener("click", () => {
    if (listName.value !== "") {
      addNewListFunction(listName.value);
      listName.value = "";
      closeNewFunction();
    }
  });

  let closeNewListButton = document.getElementById("close-new-list");

  closeNewListButton.addEventListener("click", () => {
    listName.value = "";
    closeNewFunction();
  });
}

document.getElementById("add-list").addEventListener("click", createNewList);

