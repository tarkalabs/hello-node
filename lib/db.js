import knex from "knex";
import spec from "../knexfile";

const ENV = process.env.NODE_ENV || "development";

let db = knex(spec[ENV]);
export default db;
