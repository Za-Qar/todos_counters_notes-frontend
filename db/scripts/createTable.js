const { query } = require("../index");

async function createTable() {
  let res = await query(
    `CREATE TABLE items(
            id SERIAL PRIMARY KEY,
            todo TEXT,
            counter TEXT 
        )`
  );
  console.log(res);
}

createTable();
//what if I want to also add the value of the counter
