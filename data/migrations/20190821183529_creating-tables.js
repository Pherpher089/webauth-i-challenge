exports.up = function(knex) {
	return knex.schema.createTable("credentials", tbl => {
		tbl.increments();
		tbl
			.text("username", 128)
			.unique()
			.notNullable();
		tbl
			.text("password", 128)
			.unique()
			.notNullable();
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("credentials");
};
