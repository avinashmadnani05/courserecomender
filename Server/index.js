// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const userinputModel = require('./models/users');
// const recom_websiteModel = require('./models/userdata');
// const domaininputsModel = require('./models/domaininputs'); // Ensure correct naming
// const { spawn } = require('child_process'); // To run Python script
// require('dotenv').config();

// // const path = require("path");

// const app = express();

// app.use(express.json());
// app.use(cors(corsOptions));

// const corsOptions = {
//   origin: "https://courserecomender-eoxr.vercel.app" // frontend URI (ReactJS)
// }

// // connect MongoDB
// mongoose.connect(process.env.MONGODB_URI).then(() => {
 
// });
// app.post('/', (req, res) => {
//   // Handle signup logic
//   res.send({ message: 'User signed up!' });
// });
// app.post('/signup', (req, res) => {
//   // Handle signup logic
//   res.send({ message: 'User signed up!' });
// });
// // Existing signup and login routes
// app.post('/signup', (req, res) => {
//   const { name, email, password } = req.body;
//   const user = new recom_websiteModel({ name, email, password });
//   user.save()
//     .then(() => res.json({ message: 'User created successfully' }))
//     .catch(err => res.status(500).json({ message: 'Error creating user', error: err }));
// });

// app.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   recom_websiteModel.findOne({ email: email })
//     .then(user => {
//       if (user) {
//         if (user.password === password) {
//           res.json("success");
//         } else {
//           res.json("Incorrect Password");
//         }
//       } else {
//         res.json("No user found");
//       }
//     })
//     .catch(err => res.status(500).json({ message: 'Error finding user', error: err }));
// });
// // Example schema and model
// const RecommendationSchema = new mongoose.Schema({
//   userId: Number, // Ensure userId is stored
//   recommended_courses: Array,
// });
// const Recommendation = mongoose.model('Recommendation', RecommendationSchema);


// // Save user input and dynamically generate recommendations
// app.post('/UserInput', async (req, res) => {
//   try {
//     const userInput = new userinputModel(req.body);
//     await userInput.save();

//     // Run the Python script after saving user input
//     const python = spawn('python', ['ML/input.py']); // Update the path if needed

//     python.stdout.on('data', (data) => {
//       console.log(`Python Output: ${data}`);
//     });

//     python.stderr.on('data', (data) => {
//       console.error(`Python Error: ${data}`);
//     });

//     python.on('close', async (code) => {
//       if (code === 0) {
//         // Wait for recommendations to be generated, then fetch them
//         const recommendations = await Recommendation.findOne({ userId: req.body.userId });
//         res.json({
//           message: 'User input saved and recommendations generated successfully.',
//           recommendations: recommendations ? recommendations.recommended_courses : []
//         });
//       } else {
//         res.status(500).json({ message: 'Error running recommendation script.' });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving user input.' });
//   }
// });

// // Fetch recommendations
// app.get('/getRecommendations/:userId', async (req, res) => {
//   try {
//     const userId = parseInt(req.params.userId);
//     const recommendations = await Recommendation.findOne({ userId });

//     if (recommendations) {
//       res.json(recommendations.recommended_courses);
//     } else {
//       res.status(404).json({ message: 'No recommendations found for this user' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error fetching recommendations' });
//   }
// });


// // New route for DomainInput
// // Save Domain Input and Run Python Script for Recommendation
// app.post('/domain', async (req, res) => {
//   try {
//     const { userId, pastExperience, skills, interests } = req.body;

//     const domainInput = new domaininputsModel({ userId, interests, pastExperience, skills });
//     await domainInput.save();

//     const python = spawn('python', ['ML/domain.py']);

//     python.stdout.on('data', (data) => {
//       console.log(`Python Output: ${data}`);
//     });

//     python.stderr.on('data', (data) => {
//       console.error(`Python Error: ${data}`);
//     });

//     python.on('close', (code) => {
//       if (code === 0) {
//         res.json({ message: 'User input saved successfully and recommendations generated.' });
//       } else {
//         res.status(500).json({ message: 'Error running recommendation script.' });
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving user input.' });
//   }
// });

// // Define the schema for domain recommendations
// const domainRecomSchema = new mongoose.Schema({
//   userId: Number,
//   recommended_domains: Array,
// });

// const domainRecomModel = mongoose.model('domainRecommendations', domainRecomSchema);


// // Fetch Domain Recommendations
// app.get('/getdomains/:userId', async (req, res) => {
//   try {
//     const userId = parseInt(req.params.userId);
//     const recommendations = await domainRecomModel.findOne({ userId });

//     // Debugging output to check the model and function
//     console.log("domainRecomModel:", domainRecomModel);
//     console.log("Function available:", typeof domainRecomModel.findOne);

//     if (recommendations) {
//       res.json(recommendations.recommended_domains);
//     } else {
//       res.status(404).json({ message: 'No domain recommendations found for this user' });
//     }
//   } catch (error) {
//     console.error('Error fetching domain recommendations:', error);
//     res.status(500).json({ message: 'Error fetching domain recommendations' });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // Start the server
// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const recom_websiteModel = require('./models/userdata');
const methods = require('methods');
require('dotenv').config();

const app = express();
app.use(express.json());

// Define CORS Configuration before using it

  const corsOptions = {
    origin: "https://courserecomender.vercel.app" ,// Add localhost for dev
    methods: ['GET', 'POST'],
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

    // Run the Python script after saving user input
    const python = spawn('python', ['ML/input.py']); // Update the path if needed

    python.stdout.on('data', (data) => {
      console.log(`Python Output: ${data}`);
    });

    python.stderr.on('data', (data) => {
      console.error(`Python Error: ${data}`);
    });

    python.on('close', async (code) => {
      if (code === 0) {
        // Wait for recommendations to be generated, then fetch them
        const recommendations = await Recommendation.findOne({ userId: req.body.userId });
        res.json({
          message: 'User input saved and recommendations generated successfully.',
          recommendations: recommendations ? recommendations.recommended_courses : []
        });
      } else {
        res.status(500).json({ message: 'Error running recommendation script.' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving user input.' });
  }
});




// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
