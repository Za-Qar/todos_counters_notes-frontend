import React from "react";
function AllTodos({ value, deleteTodo, index }) {
  return (
    <div>
      <li>{value}</li>
      <button onClick={() => deleteTodo(index)}>Delete</button>
    </div>
  );
}
export default AllTodos;
