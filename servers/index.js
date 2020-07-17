const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connect } = require('mongoose');
const passport = require('passport');

const { DB, PORT } = require('./configs');
const app = express();

// initialize public directory;
const pubDir = path.join(__dirname, '../storage');

// App's middlewares;
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// will we use this ??? passport ??
app.use(passport.initialize());
app.use(passport.session());
require('./middlewares/passport')(passport);
// serve the static files;
app.use(express.static(pubDir));

// app routes;
const routes = require('./routes');
app.use('/api/v1/users', routes.users);
app.use('/api/v1/blogs', routes.blogs);
app.use('/api/v1/cats', routes.cats);
app.use('/api/v1/comments', routes.comments);

/**@DESC Asynchronous function to start app */
const startApp = async () => {
	try {
		// Connect to the Database;
		await connect(DB, {
			useFindAndModify: false,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useNewUrlParser: true
		});

		console.log(`[ OK ] Connected to database on ${DB}`);
		console.log(`[ OK ] Serve static files in ${pubDir}`);

		app.listen(PORT, () => {
			console.log(`[ OK ] Server started. Listening on port ${PORT}`);
		});
	} catch (error) {
		console.error(`[ ERROR ] Unable to start server. \n ${error}`);
	}
};

// Start the Fuckin' App;
startApp();
