// imports
import { createList } from "./lists.js";
import { createCard } from "./cards.js";
import { createCheckList } from "./checklist.js";
import { createCheckItem } from "./checkitems.js";
import { apiKey, token } from "./config.js";
const baseUrl = "https://api.trello.com/1/"; 
const boardId = "68592ed26baa327bfc0b6f90"; // replace with your board ID

async function listsData() {
    let rawListsData = await fetch(`${baseUrl}boards/${boardId}/lists?&key=${apiKey}&token=${token}`)
    let lists = await rawListsData.json()
    return lists
}
async function cardsData() {
    let rawCardsData = await fetch(`${baseUrl}boards/${boardId}/cards?&key=${apiKey}&token=${token}`)
    let cards = await rawCardsData.json()
    return cards
}
async function checklistData() {
    let rawChecklistData = await fetch(`${baseUrl}boards/${boardId}/checklists?&key=${apiKey}&token=${token}`)
    let checklists = await rawChecklistData.json()
    return checklists
}

// -- store the data in variables 
let listsDataToLoad = await listsData()
let cardsDataToLoad = await cardsData()
let checklistDataToLoad = await checklistData()


// create lists, cards, checklists and checkitems with loaded data
for (let list of listsDataToLoad) {
    createList(list.name, list.id)
}

for (let card of cardsDataToLoad) {
    createCard(card.name, card.id, card.idList)
}
for (let checklist of checklistDataToLoad) {
    if (!checklist.name === "null" || !checklist.id == "null" ||`${checklist.idCard}-card-Data-container`== "null"){
         console.log(checklist.name, checklist.id, `${checklist.idCard}-card-Data-container`)
         break
    }
    createCheckList(checklist.name, checklist.id, `${checklist.idCard}-card-Data-container`)
    if (checklist.checkItems) {
    for (let checkItem of checklist.checkItems) {
        createCheckItem(checkItem.name, checkItem.state, checkItem.id, checklist.id)
    }}
}