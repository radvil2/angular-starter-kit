class MyQueryfy {
	constructor(queries) {
		this.queries = queries;
	}

	search() {
		const { field, value } = this.queries;
		let item = {};

		if (field && value) item[field] = { $regex: `${value}`, $options: 'i' };
		return item;
	}

	select() {
		return (this.queries.select = this.queries.select || '-__v');
	}

	sort() {
		return (this.queries.sort = this.queries.sort || '-createdAt');
	}

	limit() {
		return (this.queries.limit = parseInt(this.queries.limit) || 99);
	}

	page() {
		return (this.queries.page = parseInt(this.queries.page) || 1);
	}

	skip() {
		let skip,
			{ limit, page } = this.queries;
		return (skip = (page - 1) * limit);
	}
}

module.exports = MyQueryfy;
