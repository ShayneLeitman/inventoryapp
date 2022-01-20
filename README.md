# Inventory App

This inventory tracking web application allows users to view, create, edit and delete inventory items. The application also allows users to export a list of selected inventory items as a CSV file.

## Set-up instructions
1. Clone this repository using git.
2. In *inventoryapp\api\server.js*, alter the value of `const username`, `const pwrd`, and `const clustername` to their correct test values or set the environment variables accordingly. These values can be found in the additional attachment with my application *dotenv.txt*. If this file is not accessible, a MongoDB account must be made at [MongoDB](https://www.mongodb.com/), and a [MongoDB Atlas cluster created](https://www.youtube.com/watch?v=esKNjzDZItQ). If creating a new MongoDB cluster, the value of `const dbURI` in *inventoryapp\api\server.js* might need to be modified. [The correct value can be found by selecting the "Connect your application" option](https://youtu.be/esKNjzDZItQ?t=338).
3. Download Node JS if it is not already downloaded from [this link](https://nodejs.org/en/).
4. Open a terminal and navigate to the *inventoryapp/api* directory.
5. Run `npm install` in *inventoryapp\api* to install required node modules.
6. Open a new terminal and navigate to the *inventoryapp\frontend\inventoryapp* directory.
7. Run `npm install` in *inventoryapp\frontend\inventoryapp* to install required node modules.
8. Start the api first by running `npm start` in the *inventoryapp\api* directory.
9. Start the front-end application by running `npm start` in the *inventoryapp\frontend\inventoryapp* directory.
10. The application should now be running on *http://localhost:3000*! You can view the inventory list or create a new inventory item using the navbar.

## Chosen "additional" feature
The application includes the additional feature of exporting selected inventory item data to a CSV file.

## Technologies used
* [React.js](https://reactjs.org/)
* [Bootstrap](https://getbootstrap.com)
* [Node JS](https://nodejs.org/en/)
* [Express JS](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)