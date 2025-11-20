// imports
import {apiKey, token} from "./config.js";

const boardId = "68592ed26baa327bfc0b6f90"; // replace with your board ID
const baseUrl = "https://api.trello.com/1/";

// ---------  functions to add (lists, cards, checklists, checkitems) -------------

// function to add new list
export async function addNewList(name) {
  try {
    let rawListData = await fetch(
      `${baseUrl}lists?name=${name}&idBoard=${boardId}&pos=bottom&key=${apiKey}&token=${token}`,
      { method: "POST" }
    );
    let listData = await rawListData.json();
    return listData;
  } catch (err) {
    console.error(`Error while adding new list: ${err}`);
  }
}

// function to add new card
export async function addNewCard(cardName, listId) {
  try {
    let rawCardData = await fetch(
      `${baseUrl}cards?idList=${listId}&key=${apiKey}&token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: cardName }),
      }
    );
    let cardData = await rawCardData.json();
    return cardData;
  } catch (err) {
    console.error(`Error while adding new card: ${err}`);
  }
}

// add new checklist
export async function addNewCheckList(checkListName, cardId) {
  try {
    let rawCheckListData = await fetch(
      `${baseUrl}checklists?idCard=${cardId}&key=${apiKey}&token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: checkListName }),
      }
    );
    let checklistData = await rawCheckListData.json();
    return checklistData;
  } catch (err) {
    console.error(`Error while adding new check list : ${err}`);
  }
}

// add new check item
export async function addNewCheckItem(content, checklistId) {
  try {
    let rawCheckItemData = await fetch(
      `${baseUrl}checklists/${checklistId}/checkItems?key=${apiKey}&token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: content }),
      }
    );

    let checkItemData = await rawCheckItemData.json();
    return checkItemData;
  } catch (err) {
    console.error(`Error while adding new check item : ${err}`);
  }
}
// -------------------------  functions for updating --------------------------------
// function for updating list name
export async function updateListName(listId, newName) {
  try {
    await fetch(`${baseUrl}lists/${listId}?key=${apiKey}&token=${token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
  } catch (err) {
    console.log(`Error while updating a list with list id : ${listId}`);
  }
}

// function for updating card name
export async function updateCardName(cardId, newName) {
  try {
    await fetch(`${baseUrl}cards/${cardId}?key=${apiKey}&token=${token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
  } catch (err) {
    console.log(`Error while updating a card with card id : ${cardId}`);
  }
}

// function for updating checklist name
export async function updateCheckListName(checkListId, newName) {
  try {
    await fetch(
      `${baseUrl}checklists/${checkListId}?key=${apiKey}&token=${token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      }
    );
  } catch (err) {
    console.log(
      `Error while updating a checkList with checkList id ${checkListId} : ${err}`
    );
  }
}

// function to update checkitem progress

export async function updateCheckItemProgress(
  progress,
  checkItemId,
  checklistId
) {
  try {
    let rawCardData = await fetch(
      `${baseUrl}checklists/${checklistId}/cards?key=${apiKey}&token=${token}`
    );
    let cardData = await rawCardData.json();
    var cardId = cardData[0].id;
  } catch (err) {
    console.log(
      `Error while getting card id of a checklist with checklist id ${checklistId} : ${err} `
    );
  }
  try {
    await fetch(
      `${baseUrl}cards/${cardId}/checklist/${checklistId}/checkItem/${checkItemId}?key=${apiKey}&token=${token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: progress }),
      }
    );
  } catch (err) {
    console.log(
      `Error while updating a checkitem with checkitem id : ${checkItemId}`
    );
  }
}

// function to update checkitem

export async function updateCheckItem(content, checkItemId, checklistId) {
  try {
    let rawCardData = await fetch(
      `${baseUrl}checklists/${checklistId}/cards?key=${apiKey}&token=${token}`
    );
    let cardData = await rawCardData.json();
    var cardId = cardData[0].id;
  } catch (err) {
    console.log(
      `Error while getting card id of a checklist with checklist id ${checklistId} : ${err} `
    );
  }
  try {
    await fetch(
      `${baseUrl}cards/${cardId}/checklist/${checklistId}/checkItem/${checkItemId}?key=${apiKey}&token=${token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: content }),
      }
    );
  } catch (err) {
    console.log(
      `Error while updating a checkitem with checkitem id : ${checkItemId}`
    );
  }
}

// -------------------------  functions for deleting --------------------------------

// function for delete a list
export async function deleteList(listId) {
  try {
    await fetch(
      `${baseUrl}lists/${listId}/closed?key=${apiKey}&token=${token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: true }),
      }
    );
  } catch (err) {
    console.log(`Error while deleting a list with list id : ${listId}`);
  }
}

// function for delete a card
export async function deleteCard(cardId) {
  try {
    await fetch(
      `${baseUrl}cards/${cardId}/closed?key=${apiKey}&token=${token}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: true }),
      }
    );
  } catch (err) {
    console.log(`Error while deleting a card with card id : ${cardId}`);
  }
}

// function for delete checklist
export async function deleteCheckList(checkListId) {
  try {
    await fetch(
      `${baseUrl}checklists/${checkListId}?key=${apiKey}&token=${token}`,
      {
        method: "DELETE",
      }
    );
  } catch (err) {
    console.log(
      `Error while deleting a checkList with checklist id : ${checkListId}`
    );
  }
}

// function for delete checkitem
export async function deleteCheckItem(checkItemId, checkListId) {
  try {
    await fetch(
      `${baseUrl}checklists/${checkListId}/checkItems/${checkItemId}?key=${apiKey}&token=${token}`,
      {
        method: "DELETE",
      }
    );
  } catch (err) {
    console.log(
      `Error while deleting a check item with checkitem id : ${checkItemId}`
    );
  }
}

