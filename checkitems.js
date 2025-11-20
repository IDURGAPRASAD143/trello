// imports
import {
  addNewCheckItem,
  updateCheckItemProgress,
  updateCheckItem,
  deleteCheckItem,
} from "./api_calls.js";

// function to update progress via checkbox
function changeProgress(checkBox, content, checkItemId, checkListId) {
  if (checkBox.checked) {
    content.style.textDecoration = "line-through";
    updateCheckItemProgress("complete", checkItemId, checkListId);
  } else {
    content.classList.remove("completed");
    content.style.textDecoration = "none";
    updateCheckItemProgress("incomplete", checkItemId, checkListId);
  }
}

// edit check item function
function editCheckItem(checkItemId, content, checkListId) {
  let input = document.createElement("input");
  input.type = "text";
  input.className = "edit-check-item-input";
  input.placeholder = "Enter Checkitem Name";
  input.value = content.textContent;

  content.textContent = "";
  content.appendChild(input);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      content.textContent = input.value || "Untitled";
      updateCheckItem(content.textContent, checkItemId, checkListId);
    }

    input.addEventListener("blur", () => {
      content.textContent = input.value || "Untitled";
      updateCheckItem(content.textContent, checkItemId, checkListId);
    });
  });
}

// function to delete a check item
function checkItemDeleteFunction(checkItemId, checkListId) {
  let checkItem = document.getElementById(checkItemId);
  let checkList = document.getElementById(checkListId);
  checkList.removeChild(checkItem);
  deleteCheckItem(checkItemId, checkListId);
}

// function to create a checkItem element and append it to the check list
export async function createCheckItem(
  content,
  progress,
  checkItemId,
  checkListId
) {
  let checkItemContainer = document.createElement("div");
  checkItemContainer.id = checkItemId;
  checkItemContainer.className = "checkitem-container";

  let contentSection = document.createElement("div");
  contentSection.className = "check-item-content-checkbox-wrapper";

  let checkItemContent = document.createElement("div");
  checkItemContent.className = "check-item-content";
  checkItemContent.textContent = content;

  let checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  if (progress === "complete") {
    checkBox.checked = true;
    checkItemContent.style.textDecoration = "line-through";
  } else {
    checkItemContent.style.textDecoration = "none";
    checkBox.checked = false;
  }

  checkBox.addEventListener("change", () => {
    changeProgress(checkBox, checkItemContent, checkItemId, checkListId);
  });

  contentSection.append(checkBox, checkItemContent);

  let options = document.createElement("div");
  options.className = "check-item-options";

  let checkItemEdit = document.createElement("i");
  checkItemEdit.className = "fa-solid fa-pen-to-square check-item-edit-icon";

  checkItemEdit.addEventListener("click", () => {
    editCheckItem(checkItemId, checkItemContent, checkListId);
  });

  checkItemContent.addEventListener("dblclick", () => {
    editCheckItem(checkItemId, checkItemContent, checkListId);
  });

  let checkItemDelete = document.createElement("i");
  checkItemDelete.className = "fa-solid fa-trash check-item-delete-icon";

  checkItemDelete.addEventListener("click", () => {
    checkItemDeleteFunction(checkItemId, checkListId);
  });

  options.append(checkItemEdit, checkItemDelete);
  checkItemContainer.append(contentSection, options);

  let checklist = document.getElementById(checkListId);
    if (!checklist) {
    return; // do not load archived data
  }
  checklist.append(checkItemContainer);
}

// function to add new checkItem and create its UI
export async function addNewCheckItemFunction(content, checklistId) {
  let checkItemData = await addNewCheckItem(content, checklistId);
  let checkItemId = checkItemData.id;
  let checkItemProgress = checkItemData.state;
  await createCheckItem(content, checkItemProgress, checkItemId, checklistId);
}
