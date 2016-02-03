
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.raw("alter table posts alter column title type text"),
    knex.schema.raw("alter table posts alter column url type text")]);
};

exports.down = function(knex, Promise) {
  
};
