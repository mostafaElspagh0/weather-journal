//create project data map
const projectData = {};

//import libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//create express app
const app = express();

// add the midlayers 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('website'));

// listen for reuqests 
const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


//create routes
app.get('/entry/:id', (req, res) => {
  res.send(projectData[req.params.id]);
});

app.get('/all', (req, res) => {
  res.send(projectData);
});

app.post('/add', (req, res) => {
  const { body } = req;
  projectData[body.id] = body;
  res.send(projectData[body.id]);
});
