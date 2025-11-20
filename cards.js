// imports
import { addNewCard, updateCardName, deleteCard } from "./api_calls.js";
import { addNewCheckListFunction } from "./checklist.js";

// Function to show card details when clicked
function showCardData(containerId) {
  let container = document.getElementById(containerId);
  container.style.display = "flex";
}

// Function to create the "Add new Checklist" UI
function addCheckListOption(cardId) {
  let addCheckListContainer = document.createElement("div");
  addCheckListContainer.id = "add-checklist-container";

  let addChecklist = document.createElement("div");
  addChecklist.className = "add-checklist-container";
  addChecklist.textContent = "+ Add checklist";

  let addNewSection = document.createElement("div");
  addNewSection.className = "add-new-checklist-section";

  let input = document.createElement("input");
  input.placeholder = "Enter Checklist Name";
  input.type = "text";
  input.className = "checklist-name-input";

  let optionsDiv = document.createElement("div");
  optionsDiv.id = "add-new-checklist-options";
  optionsDiv.className = "add-checklist-options";

  let addNewCheckListButton = document.createElement("div");
  addNewCheckListButton.className = "add-new-checklist-btn";
  addNewCheckListButton.textContent = "Add";

  let closeNewCheckListButton = document.createElement("div");
  closeNewCheckListButton.className = "close-new-checklist-btn";
  closeNewCheckListButton.textContent = "Close";

  optionsDiv.append(addNewCheckListButton, closeNewCheckListButton);
  addNewSection.append(input, optionsDiv);
  addCheckListContainer.append(addChecklist, addNewSection);

  // Event listeners for checklist UI interactions
  addChecklist.addEventListener("click", () => {
    addNewSection.style.display = "block";
    addChecklist.style.display = "none";
  });

  closeNewCheckListButton.addEventListener("click", () => {
    input.value = "";
    addNewSection.style.display = "none";
    addChecklist.style.display = "flex";
  });

  addNewCheckListButton.addEventListener("click", () => {
    let name = input.value.trim();
    if (name !== "") {
      addNewCheckListFunction(name, cardId);
      input.value = "";
      addNewSection.style.display = "none";
      addChecklist.style.display = "flex";
    }
  });

  return addCheckListContainer;
}

// Function to delete a card
function deleteCardFunction(name, cardId) {
  if (confirm(`Do you want to archive ${name}`)) {
    deleteCard(cardId);
    let body = document.querySelector("body");
    let blurBody = document.getElementById(`${cardId}-container`);
    let card = document.getElementById(cardId);
    let list = card.parentElement;
    list.removeChild(card);
    body.removeChild(blurBody);
  }
}

// Function to edit a card name
function editCardName(cardId, cardName) {
  let card = document.getElementById(cardId);
  let input = document.createElement("input");
  input.placeholder = " Enter card name";
  input.type = "text";
  input.className = "card-name-input";
  input.value = cardName.textContent;
  cardName.textContent = "";
  cardName.appendChild(input);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      let newName = input.value || "Untitled";
      card.textContent = newName;
      cardName.textContent = newName;
      updateCardName(cardId, newName);
    }
  });

  input.addEventListener("blur", () => {
    let newName = input.value || "Untitled";
    card.textContent = newName;
    cardName.textContent = newName;
    updateCardName(cardId, newName);
  });
}

// Function to set up card header, title, and checklist section
function createElementsInCardContainer(cardId, cardDataContainerId) {
  let cardDataContainer = document.getElementById(cardDataContainerId);
  let cardName = document.getElementById(cardId).textContent;

  let cardHeader = document.createElement("div");
  cardHeader.className = "card-header";

  let cardDelete = document.createElement("i");
  cardDelete.className = "fa-solid fa-box-archive card-delete";

  let cardTitle = document.createElement("div");
  cardTitle.className = "card-title";
  cardTitle.textContent = cardName;

  // Attach events
  cardDelete.addEventListener("click", () => {
    deleteCardFunction(cardName, cardId);
  });
  cardTitle.addEventListener("dblclick", () => {
    editCardName(cardId, cardTitle);
  });

  cardHeader.append(cardTitle, cardDelete);
  cardDataContainer.append(cardHeader);

  let checkListHeading = document.createElement("div");
  checkListHeading.className = "checklist-heading";
  checkListHeading.textContent = "Checklists";
  cardDataContainer.append(checkListHeading, addCheckListOption(cardId));
}

// Function to create card data modal when a card is clicked
function createCardDataContainer(cardId) {
  let body = document.querySelector("body");
  let blurBody = document.createElement("div");
  blurBody.id = `${cardId}-container`;
  blurBody.className = "blur-body";

  let cardDataContainer = document.createElement("div");
  cardDataContainer.id = `${cardId}-card-Data-container`;
  cardDataContainer.className = "card-Data-container";

  blurBody.appendChild(cardDataContainer);
  body.appendChild(blurBody);

  createElementsInCardContainer(cardId, `${cardId}-card-Data-container`);

  blurBody.addEventListener("click", (e) => {
    if (e.target === blurBody) {
      blurBody.style.display = "none";
    }
  });
}

// Function to create a card element and attach to the UI
export async function createCard(name, cardId, listId) {
  let card = document.createElement("div");
  card.id = cardId;
  card.className = "card-box";
  card.textContent = name;

  let list = document.getElementById(listId);
  let addNewcardOptions = list.children[list.children.length - 1];
  list.insertBefore(card, addNewcardOptions);

  createCardDataContainer(cardId);
  card.addEventListener("click", () => {
    showCardData(`${cardId}-container`);
  });
}

// Function to add a new card and build its UI
export async function addNewCardFunction(name, listId) {
  let cardData = await addNewCard(name, listId);
  let cardId = cardData.id;
  createCard(name, cardId, listId);
}
