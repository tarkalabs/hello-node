
exports.up = function(knex, Promise) {
  return knex.schema.createTable("users",function(t) {
    t.increments();
    t.string("name");
    t.string("password");
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
