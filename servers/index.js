const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const { connect } = require('mongoose');

// Bring in the app's constants
const { DB, PORT } = require('./configs');

// Initialize app using express
const app = express();

// App's middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

/**@DESC Asynchronous function to start app */
const startApp = async () => {
	try {
		// Connect to the Database
		await connect(DB, {
			useFindAndModify: false,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useNewUrlParser: true
		});

		console.log(`[ OK ] Connection to database succeed. \n[ DB ] ${DB}`);

		// Start the Express App
		app.listen(PORT, () => {
			console.log(`[ OK ] Server started. Listening on port ${PORT}`);
		});
	} catch (error) {
		console.error(`[ NOT OK ] Unable to start server. \n ${error}`);
	}
};

// Start the Fuckin' App
startApp();
