const { query } = require("../db/index.js");

async function getAllData() {
  const res = await query(`SELECT * FROM todos `);
  return res.rows;
}

async function createTodo(value) {
  const res = await query(
    `INSERT INTO todos (todo)
        values ($1)`,
    [value]
  );
  console.log("models", value);
  return res; //why res.rows?
}

async function createCounter(value) {
  console.log("models", value);
  console.log("models", value.counter);
  console.log("models", value.zero);
  const res = await query(
    `INSERT INTO counters (counter, count)
        values ($1, $2)`,
    [value.counter, value.zero]
  );
  return res;
}

async function incrementCounter(id) {
  const res = await query(
    `UPDATE counters
      SET count = count + 1
      WHERE id = ${id}`
  );
  console.log("models - increment counter", id);
  return res;
}

async function decrementCounter(id) {
  const res = await query(`
  UPDATE counters
  SET count = count - 1
  WHERE id = ${id}`);
  console.log("models - decrement cointer", id);
  return res;
}

async function getMaxid() {
  const res = await query(
    `SELECT id FROM counters WHERE id=(SELECT max(id) FROM counters)`
  );
  console.log("max id result", res.rows[0].id);
  return { success: true, payload: res.rows[0].id };
}

module.exports = {
  getAllData,
  createTodo,
  createCounter,
  incrementCounter,
  decrementCounter,
  getMaxid,
};
