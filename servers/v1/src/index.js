const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connect } = require('mongoose');
const helmet = require('helmet');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { DB, PORT } = require('./configs');
const app = express();

// initialize public directory;
const pubDir = path.join(__dirname, '../storage');

// App's middlewares;
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// serve the static files;
app.use(express.static(pubDir));

// app routes;
const routes = require('./routes');

app.use('/api/v1/users', routes.users);
app.use('/api/v1/blogs', routes.blogs);
app.use('/api/v1/cats', routes.cats);
app.use('/api/v1/comments', routes.comments);

// global error handler
// app.use((error, req, res, next) =>
// 	res.status(error.status || 500).json({ error: { message: error.message } })
// );

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
		// console.log(`[ OK ] Serve static files in ${pubDir}`);

		app.listen(PORT, () => {
			console.log(`[ OK ] Server started. Listening on port ${PORT}`);
		});
	} catch (error) {
		console.error(`[ ERROR ] Unable to start server. \n ${error}`);
	}
};

// Start the Fuckin' App;
startApp();
