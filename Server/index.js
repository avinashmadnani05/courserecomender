
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recom_websiteModel = require('./models/userdata');
const methods = require('methods');
require('dotenv').config();
const userinputModel = require('./models/users');
const { spawn } = require('child_process'); // To run Python script

const app = express();
app.use(express.json());

// Define CORS Configuration before using it

  const corsOptions = {
    origin: "https://courserecomender.vercel.app"  ,// Add localhost for dev
  //  origin:"https://localhost:3000/",
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true, // Allow credentials like cookies
  };
  app.use(cors(corsOptions));
  


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the app if the database connection fails
  });

// Routes
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const user = new recom_websiteModel({ name, email, password });

  user.save()
    .then(() => res.json({ message: 'User created successfully' }))
    .catch(err => res.status(500).json({ message: 'Error creating user', error: err.message }));
});


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

// Default Route
app.get('/', (req, res) => {
  res.send({ message: 'Backend is running!' });
});


// // Example schema and model
const RecommendationSchema = new mongoose.Schema({
  userId: Number, // Ensure userId is stored
  recommended_courses: Array,
});
const Recommendation = mongoose.model('Recommendation', RecommendationSchema);


// Save user input and dynamically generate recommendations
app.post('/UserInput', async (req, res) => {
  try {
    const userInput = new userinputModel(req.body);
    await userInput.save();

    const python = spawn('python', ['ML/input.py']);

    python.stdout.on('data', (data) => {
      console.log(`Python Output: ${data}`);
    });

    python.stderr.on('data', (data) => {
      console.error(`Python Error: ${data}`);
    });

    python.on('close', async (code) => {
      if (code === 0) {
        const recommendations = await Recommendation.findOne({ userId: req.body.userId });
        if (recommendations) {
          res.json({
            message: 'Recommendations fetched successfully.',
            recommendations: recommendations.recommended_courses,
          });
        } else {
          res.status(404).json({ message: 'No recommendations found.' });
        }
      } else {
        res.status(500).json({ message: 'Error executing Python script.' });
      }
    });
  } catch (error) {
    console.error('Error saving user input:', error.message);
    res.status(500).json({ message: 'Error saving user input.', error: error.message });
  }
});



// Fetch recommendations
app.get('/getRecommendations/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid User ID' });
  }
  try {
    const recommendations = await Recommendation.findOne({ userId });
    if (recommendations) {
      res.json(recommendations.recommended_courses);
    } else {
      res.status(404).json({ message: 'No recommendations found for this user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
});


// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
