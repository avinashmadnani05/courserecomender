const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userinputModel = require('./models/users');
const recom_websiteModel = require('./models/userdata');
const { spawn } = require('child_process'); // To run Python script
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/recom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const user = new recom_websiteModel({ name, email, password });
  user.save()
    .then(() => res.json({ message: 'User created successfully' }))
    .catch(err => res.status(500).json({ message: 'Error creating user', error: err }));
});

// Define routes
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  recom_websiteModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("success");
        } else {
          res.json("Incorrect Password");
        }
      } else {
        res.json("No user found");
      }
    })
    .catch(err => res.status(500).json({ message: 'Error finding user', error: err }));
});

// User Input Route
app.post('/UserInput', async (req, res) => {
  try {
    const userInput = new userinputModel(req.body);
    await userInput.save();

    // Run the Python script after saving user input
    const python = spawn('python', ['ML/input.py']); // Replace with the correct path

    python.stdout.on('data', (data) => {
      console.log(`Python Output: ${data}`);
    });

    python.stderr.on('data', (data) => {
      console.error(`Python Error: ${data}`);
    });

    python.on('close', (code) => {
      if (code === 0) {
        res.json({ message: 'User input saved successfully and recommendations generated.' });
      } else {
        res.status(500).json({ message: 'Error running recommendation script.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving user input.' });
  }
});

// Example schema and model
const RecommendationSchema = new mongoose.Schema({
  userId: Number, // Ensure userId is stored
  recommended_courses: Array,
});
const Recommendation = mongoose.model('Recommendation', RecommendationSchema);

// API endpoint to get recommendations
app.get('/getRecommendations/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId); // Ensure userId is a number
    const recommendations = await Recommendation.findOne({ userId });

    if (recommendations) {
      res.json(recommendations.recommended_courses); // Send recommended courses as an array
    } else {
      res.status(404).json({ message: 'No recommendations found for this user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
});

// Serve React app
app.use(express.static(path.resolve(__dirname, "Client/course_recom", "build"))); // Use __dirname correctly
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Client/course_recom", "build", "index.html")); // Use __dirname correctly
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
