const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userinputModel = require('./models/users');
const recom_websiteModel = require('./models/userdata');
const domaininputsModel = require('./models/domaininputs'); // Ensure correct naming
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

// Existing signup and login routes
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const user = new recom_websiteModel({ name, email, password });
  user.save()
    .then(() => res.json({ message: 'User created successfully' }))
    .catch(err => res.status(500).json({ message: 'Error creating user', error: err }));
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

// New route for DomainInput
app.post('/domain', async (req, res) => {
  console.log(req.body); // Log the request body
  try {
    const { userId, pastExperience, skills, interests } = req.body; // Destructure domain
    const domainputs = new domaininputsModel({ userId, interests, pastExperience, skills }); // Use the correct model
    await domainputs.save();
    res.json({ message: 'Domain input saved successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving domain input.', error });
  }
});

// New schema and model for storing domain recommendations
const domainRecomSchema = new mongoose.Schema({
  userId: Number,
  recommended_domains: Array,
});
const DomainRecommendation = mongoose.model('DomainRecommendation', domainRecomSchema);

// API endpoint to fetch domain recommendations for a user
app.get('/getdomains/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId); // Ensure userId is a number
    const recommendations = await DomainRecommendation.findOne({ userId });

    if (recommendations) {
      res.json(recommendations.recommended_domains);
    } else {
      res.status(404).json({ message: 'No domain recommendations found for this user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching domain recommendations' });
  }
});


// User input handling and Python script execution
app.post('/UserInput', async (req, res) => {
  try {
    const userInput = new userinputModel(req.body);
    await userInput.save();

    // Run the Python script after saving user input
    const python = spawn('python', ['ML/recomend.py']);

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

// Example schema and model for recommendations
const RecommendationSchema = new mongoose.Schema({
  userId: Number,
  recommended_courses: Array,
});
const Recommendation = mongoose.model('Recommendation', RecommendationSchema);

// API endpoint to get recommendations
app.get('/getRecommendations/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId); // Ensure userId is a number
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






// Serve React app
app.use(express.static(path.resolve(__dirname, "Client/course_recom", "build")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Client/course_recom", "build", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
