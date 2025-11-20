# Trello Clone - project

A Trello clone web application built with plain HTML, CSS, and JavaScript. This app allows users to create and manage boards, lists, cards, checklists, and check items, with all data persisted via Trello's public API.

---

##  Folder Structure

```
trello/
├── lists.js            # List-related logic **main js file**
├── api_calls.js        # Trello API communication logic
├── cards.js            # Card-related logic
├── checklist.js        # Checklist logic
├── checkitems.js       # Check item logic
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── ReadMe.md           # Project documentation
```

---
## How the Project Works

- The application starts from the `lists.js` file, which acts as the main entry point. When the app loads, `lists.js` is responsible for initializing the UI, loading all lists from Trello, and setting up the main event listeners. Most loading functions and the initial rendering logic are found here.

- **File Responsibilities:**
  - `lists.js`: Main entry point. Loads lists from Trello, initializes the app, manages list-related UI and logic, and triggers loading of cards for each list.
  - `api_calls.js`: Handles all communication with the Trello API, including loading, creating, updating, and deleting lists, cards, checklists, and check items. All network requests are managed here.
  - `cards.js`: Manages card operations such as creating, editing, deleting, and rendering cards within lists. Also handles card-specific UI interactions and triggers loading of checklists for each card.
  - `checklist.js`: Manages checklists within cards, including loading, creating, updating, and deleting checklists. Handles checklist UI and logic.
  - `checkitems.js`: Handles individual checklist items, including adding, renaming, marking as complete/incomplete, and deleting check items. Manages check item UI and state updates.
  - `config.js`: Stores your Trello API key, token, and board ID. This file is used by `api_calls.js` to authenticate requests. (Note : create this file with your credentials as per the instructions below)
---

##  Features

- Create, edit, and delete lists and cards
- Add checklists and check items to cards
- Rename cards, lists, checklists, check items
- Mark check items as complete/incomplete
- Real-time sync with Trello via public API
- Modular codebase: separate logic for cards, lists, checklists, and API
- Responsive, clean UI

---

## 🛠 Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **API:** [Trello Public REST API](https://developer.atlassian.com/cloud/trello/rest/)

---

##  Getting Started

1. **Clone the repository:**
   ```sh
   git clone git@github.com:BhaskarAnil/trello.git
   cd trello
   ```

2. **Open the project in your code editor (e.g., VS Code).**

---

##  Trello API Setup Instructions

1. **Get your Trello API Key:**
   - Go to [Trello API Keys](https://trello.com/app-key)
   - Copy your API Key

2. **Generate a Token:**
   - On the same page, click the link to generate a token
   - Approve access and copy your Token

3. **Find your Board ID:**
   - Open your Trello board in a browser
   - The URL will look like: `https://trello.com/b/{boardId}/board-name`
   - Copy the `{boardId}` part

4. **Configure your credentials:**
   - Create a `config.js` file (or use environment variables as per your setup)
   - Add your API key, token, and board ID as shown in the codebase

---

##  Dependencies / Tools Needed

- Modern web browser (Chrome, Firefox, Edge, etc.)
- [VS Code](https://code.visualstudio.com/) or any code editor
- Internet connection (for Trello API)

---

##  Contribution Guidelines

- Fork the repository and create your branch (`git checkout -b feature/your-feature`)
- Commit your changes (`git commit -am 'Add new feature'`)
- Push to the branch (`git push origin feature/your-feature`)
- Open a Pull Request describing your changes

Please follow the existing code style and add comments where necessary.

---

##  Credits & References

- [Trello API Documentation](https://developer.atlassian.com/cloud/trello/rest/)
- Icons from [Font Awesome](https://fontawesome.com/) (if used)
- Fonts from [Google Fonts](https://fonts.google.com/) (if used)

---
