const { query } = require("../db/index.js");

async function getAllData() {
  const res = await query(`SELECT * FROM items `);
  return res.rows;
}

async function createTodo(value) {
  const res = await query(
    `INSERT INTO items (todo)
        values ($1)`,
    [value]
  );
  return res; //why res.rows?
}

async function createCounter(value) {
  const res = await query(
    `INSERT INTO items (counter)
        values ($1)`,
    [value]
  );
  return res;
}

// async function insertValue() {
//     const sql = `INSERT INTO items (todo) VALUES ($1)`;
//     collection.map(async function(value) {
//         let res = await query(sql, [value.text])
//         console.log(res)
//     })
// } ??

module.exports = {
  getAllData,
  createTodo,
  createCounter,
};
