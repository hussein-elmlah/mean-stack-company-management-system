import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import userRoutes from './src/modules/users/userRoutes.js';
import projectRoutes from './src/modules/projects/projectRoutes.js';
import cors from 'cors';
import connectDB from './databases/dbConnection.js'
import globalErrorHandler from './src/modules/errorHandeller/errorController.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use Routes
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);

// Serve static files (Assuming your Angular build is in the frontend/dist directory)
app.use(express.static(__dirname + '/frontend/dist'));

// Handle undefined routes - serve the Angular app for any other route
app.all('*', (req, res) => {
  res.sendFile(__dirname + '/frontend/dist/index.html');
});

app.use(globalErrorHandler)

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
