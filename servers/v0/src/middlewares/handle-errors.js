module.exports = (err, req, res, next) => {
	switch (true) {
		// custom application error
		case typeof err === 'string':
			const is404 = err.toLowerCase().endsWith('not found');
			const statusCode = is404 ? 404 : 400;
			return res.status(statusCode).json({ message: err });

		// mongoose validation error
		case err.name === 'ValidationError':
			return res.status(400).json({ message: err.message });

		// jwt authentication error
		case err.name === 'UnauthorizedError':
			return res.status(401).json({ message: 'Unauthorized' });

		default:
			return res.status(500).json({ message: err.message });
	}
};
