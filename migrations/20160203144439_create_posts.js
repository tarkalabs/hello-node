
exports.up = function(knex, Promise) {
  return knex.schema.createTable("posts",function(t) {
    t.increments();
    t.string("title");
    t.integer("num_comments");
    t.integer("score");
    t.string("url");
    t.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("posts");
};
