// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const session =  require('express-session');
const methodOverride = require('method-override');
const Blog = require('./models/activeuser');
const User = require('./models/user');
const usersRouter = express.Router();



// Set default view engine
app.set('view engine', 'ejs');

// Database Config
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

// Database Connection Check
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));

// Routes/ Controllers
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use('/activeusers', require('./controllers/activeusers'));
app.use('/users', require('./controllers/users'));
app.use('/sessions', require('./controllers/sessions'));



// Home Route
app.get('/',  (req, res) => {
	if (req.session.currentUser) {
		Blog.find({}, (error, allBlogs) => {
			res.render('dashboard', {
			blogs: allBlogs,
			currentUser: req.session.currentUser
			});
		});
	} else {
		res.render('index', {
			currentUser: req.session.currentUser
		});
	}
});

// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));