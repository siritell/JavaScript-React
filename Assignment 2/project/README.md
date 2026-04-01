# Restaurant Reviews React App – Quick Start

1. Clone the repo  
git clone <my-repo-url>
cd <repo-folder>

2. Install dependencies

npm install

Dependencies:
- react, react-dom (via create-react-app)
- axios (for fetching from API)
- express (for API server)
- mongodb (MongoDB client for API)

3. Make sure MongoDB is running locally

**if using Brew, otherwise start it manually**

brew services start mongodb-community  

4. Start the API

node --watch server/api.js

**or**

node server/api.js

5. Start the React app

npm start

**Note:**
* React app fetches initial reviews from the API.
* Changes (add/edit/delete) are stored only in React state and do not persist to the database.