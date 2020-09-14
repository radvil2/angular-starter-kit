const MakeQuery = {
	init: function (queries) {
		this.queries = queries;
	},

	search: function() {
		const { field, value } = this.queries;
		const item = {};

		if (field && value) {
			item[field] = { $regex: `${value}`, $options: 'i' };
		}

		return item;
	},

	select: function() {
		return this.queries.select || '-__v';
	},

	sort: function() {
		return this.queries.sort || '-createdAt';
	},

	limit: function() {
		return parseInt(this.queries.limit) || 99;
	},

	page: function() {
		return parseInt(this.queries.page) || 1;
	},

	skip: function() {
		const { limit, page } = this.queries;
		return skip = (page - 1) * limit;
	}
}

module.exports = MakeQuery;