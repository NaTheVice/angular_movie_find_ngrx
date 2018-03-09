const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var helmet = require('helmet');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('./graphql/schema');

// Connect To Database(da)tabase variable aus import
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

app.use(helmet());

// verzeichnis für alle /users...Anfragen
const users = require('./routes/users');

// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware (allows req from diffrent domainanme, anstatt allow heder origin (*))
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware (benötigt um req-body auslesen zu können)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// Passport Middleware (benötigt um requests zu authentifizieren zu können)
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//benutze users verzeichnis bei /users Anfragen
app.use('/users', users);

/* Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
*/

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});

// GraphQL Stuff
app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));