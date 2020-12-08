const { query } = require("../db/index.js");

//Get all todos
async function getAllData() {
  const res = await query(`SELECT * FROM todos `);
  return res.rows;
}

//Post todo value to db
async function createTodo(value) {
  const res = await query(
    `INSERT INTO todos (todo)
        values ($1)`,
    [value]
  );
  console.log("models", value);
  return res; //why res.rows?
}

//Post counter value to DB
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

//Increment counter by id
async function incrementCounter(id) {
  const res = await query(
    `UPDATE counters
      SET count = count + 1
      WHERE id = ${id}`
  );
  console.log("models - increment counter", id);
  return res;
}

//Decrement counter by id
async function decrementCounter(id) {
  const res = await query(`
  UPDATE counters
  SET count = count - 1
  WHERE id = ${id}`);
  console.log("models - decrement cointer", id);
  return res;
}

//Get newest counter id
async function getMaxid() {
  const res = await query(
    `SELECT id FROM counters WHERE id=(SELECT max(id) FROM counters)`
  );
  console.log("max id result", res.rows[0].id);
  return { success: true, payload: res.rows[0].id };
}

//Delete todo from db
async function deleteTodo(id) {
  const res = await query(`DELETE FROM todos WHERE id=${id};`);
  console.log("delete id", res);
  return res;
}

//Get newest todo id
async function getMaxTodoId() {
  const res = await query(
    `SELECT id FROM todos WHERE id=(SELECT max(id) FROM todos)`
  );
  console.log("max id result", res.rows[0].id);
  return res.rows;
}

module.exports = {
  getAllData,
  createTodo,
  createCounter,
  incrementCounter,
  decrementCounter,
  getMaxid,
  deleteTodo,
  getMaxTodoId,
};
