// imports
import {
  addNewCheckList,
  updateCheckListName,
  deleteCheckList,
} from "./api_calls.js";
import { addNewCheckItemFunction } from "./checkitems.js";

// function to create the "Add new Checkitem" UI
function createcheckItemAddBtn(checklistId) {
  let addCheckItemContainer = document.createElement("div");

  // creating add CheckItem button
  let addCheckItem = document.createElement("div");
  addCheckItem.className = "add-check-item";
  addCheckItem.textContent = "Add";

  // creating add-new section (initially hidden)
  let addNewSection = document.createElement("div");
  addNewSection.className = "add-new-check-item-section";

  // input for new item
  let input = document.createElement("input");
  input.type = "text";
  input.className = "add-check-item-name-input";
  input.placeholder = "Enter Checkitem Name";

  // container for Add and Close buttons
  let optionsDiv = document.createElement("div");
  optionsDiv.className = "add-new-check-item-options";

  // Add button
  let addButton = document.createElement("div");
  addButton.className = "add-new-check-item-btn";
  addButton.textContent = "Add";

  // Close button
  let closeButton = document.createElement("div");
  closeButton.className = "close-new-check-item-btn";
  closeButton.textContent = "Close";

  // assemble DOM
  optionsDiv.appendChild(addButton);
  optionsDiv.appendChild(closeButton);
  addNewSection.appendChild(input);
  addNewSection.appendChild(optionsDiv);
  addCheckItemContainer.appendChild(addCheckItem);
  addCheckItemContainer.appendChild(addNewSection);

  // event listeners
  addCheckItem.addEventListener("click", () => {
    addNewSection.style.display = "block";
    addCheckItem.style.display = "none";
  });

  closeButton.addEventListener("click", () => {
    input.value = "";
    addNewSection.style.display = "none";
    addCheckItem.style.display = "flex";
  });

  addButton.addEventListener("click", () => {
    let content = input.value.trim();
    if (content !== "") {
      addNewCheckItemFunction(content, checklistId);
      input.value = "";
      addNewSection.style.display = "none";
      addCheckItem.style.display = "flex";
    }
  });

  return addCheckItemContainer;
}

// function to enable editing a checklist title
function editCheckListName(checkList, checkListName) {
  let input = document.createElement("input");
  input.placeholder = "Enter Checklist Name";
  input.className = "edit-checklist-name-input";
  input.type = "text";
  input.value = checkListName.textContent;

  checkListName.textContent = "";
  checkListName.appendChild(input);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      checkListName.textContent = input.value || "Untitled";
      updateCheckListName(checkList.id, checkListName.textContent);
    }
  });

  input.addEventListener("blur", () => {
    checkListName.textContent = input.value || "Untitled";
    updateCheckListName(checkList.id, checkListName.textContent);
  });
}

// delete checklist
function deleteCheckListFunction(name, checkListId, containerId) {
  if (confirm(`Do you want to delete ${name} ?`)) {
    deleteCheckList(checkListId);
    let checkList = document.getElementById(checkListId);
    let cardContainer = document.getElementById(containerId);
    cardContainer.removeChild(checkList);
  }
}

// create checklist element in UI
export async function createCheckList(name, checklistId, containerId) {
  let checkList = document.createElement("div");
  checkList.id = checklistId;

  let checkListHeader = document.createElement("div");
  checkListHeader.className = "check-list-header";

  let CheckListTitleDiv = document.createElement("div");
  CheckListTitleDiv.className = "check-list-title-div";
  let CheckListIcon = document.createElement("i");
  CheckListIcon.className = "fa-solid fa-list-check checklist-icon";

  let checkListTitle = document.createElement("div");
  checkListTitle.textContent = name;
  checkListTitle.className = "check-list-title";

  CheckListTitleDiv.append(CheckListIcon);
  CheckListTitleDiv.appendChild(checkListTitle);
  checkListHeader.append(CheckListTitleDiv);

  let checkListDelete = document.createElement("div");
  checkListDelete.textContent = "Delete";
  checkListDelete.className = "checklist-delete";
  checkListHeader.append(checkListDelete);
  checkList.append(checkListHeader);

  let checkItemAddButton = createcheckItemAddBtn(checklistId);
  checkList.appendChild(checkItemAddButton);

  let cardDataContainer = document.getElementById(containerId);
    if(!cardDataContainer) {
    return; // do not load archived data
  }
  let addNewCheckListsOptions =
    cardDataContainer.children[cardDataContainer.children.length - 1];

  cardDataContainer.insertBefore(checkList, addNewCheckListsOptions);

  checkListDelete.addEventListener("click", () => {
    deleteCheckListFunction(name, checklistId, containerId);
  });

  checkListTitle.addEventListener("dblclick", () => {
    editCheckListName(checkList, checkListTitle);
  });
}

// adds checklist and builds its UI
export async function addNewCheckListFunction(name, cardId) {
  let checklistData = await addNewCheckList(name, cardId);
  let checklistId = checklistData.id;
  let cardDataContainerId = `${cardId}-card-Data-container`;
  createCheckList(name, checklistId, cardDataContainerId);
}
