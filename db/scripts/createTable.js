const { query } = require("../index");

async function createTableTodo() {
  let res = await query(
    `CREATE TABLE todos(
            id SERIAL PRIMARY KEY,
            todo TEXT
        )`
  );
  console.log(res);
}

createTableTodo();

async function createTableCounter() {
  let res = await query(
    `CREATE TABLE counters(
      id SERIAL PRIMARY KEY,
      counter TEXT,
      count INTEGER
    )`
  );
  console.log(res);
}

createTableCounter();

// async function dropItems() {
//   let res = await query(`DROP TABLE todos `);
//   console.log(res);
// }
// dropItems();
