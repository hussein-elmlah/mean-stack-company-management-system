const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const cors = require('cors');


const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your-database-name' with your actual database name)
mongoose.connect('mongodb://localhost/mean-stack-db', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Use Routes
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);

// Serve static files (Assuming your Angular build is in the frontend/dist directory)
app.use(express.static(__dirname + '/frontend/dist'));

// Handle undefined routes - serve the Angular app for any other route
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/frontend/dist/index.html');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
