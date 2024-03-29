# MEAN Stack Project

This repository contains the source code for a MEAN (MongoDB, Express.js, Angular, Node.js) stack project.

## Features:

- Projects presentation pages.
- Projects management system.
- Employees management system.

## Technologies Used:

- MongoDB
- Express.js
- Angular
- Node.js
- Other relevant technologies

## Getting Started:

<details>
  <summary><strong>Click to expand</strong></summary>

  ### Prerequisites:

  1. Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed on your machine.

  ### Installation:

  1. Clone the repository:

     ```bash
     git clone https://github.com/hussein-elmlah/mean-stack-company-management-system.git
     ```

  2. Navigate to the backend folder:

     ```bash
     cd mean-stack-company-management-system/backend
     ```

  3. Install backend dependencies:

     ```bash
     npm install
     ```

  4. Navigate to the frontend folder:

     ```bash
     cd ../frontend
     ```

  5. Install frontend dependencies:

     ```bash
     npm install
     ```

  ### Database Setup:

  1. Ensure you have MongoDB installed on your machine.

  2. Open MongoDB Compass.

  3. Connect to your local MongoDB server.

  4. In MongoDB Compass, create a new database named `mean-stack-db`.

  5. Import data into the `mean-stack-db` database using the files in the `mean-stack-db` folder.

     ```bash
     cd ../backend/mean-stack-db
     mongorestore --db mean-stack-db .
     ```

  ### Configuration:

  1. Configure your MongoDB connection in the `backend/config/db.js` file.

  ### Run the Application:

  1. Start the backend server:

     ```bash
     cd ../backend
     npm start
     ```

  2. Start the frontend development server:

     ```bash
     cd ../frontend
     npm start
     ```

  3. Open your browser and go to [http://localhost:4200](http://localhost:4200) to view the application.

  Now you're ready to explore and use the MEAN stack project! Enjoy!

</details>

## Project Structure:

- `/frontend`: Frontend codebase
- `/backend`: Backend codebase
- `/mean-stack-db`: MongoDB dummy database

## License:

This project is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html). See the [LICENSE](./LICENSE) file for details.

## Contact:

For any suggestions or feedback, please feel free to contact us.

Enjoy exploring our project!
