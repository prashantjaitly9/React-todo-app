import React, { useState } from "react";
// import PropTypes from "prop-types";

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={value}
        placeholder="What's the task today?"
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="todo-btn">
        Add Task
      </button>
    </form>
  );
};

// TodoForm.propTypes = {
//   addTodo: PropTypes.func.isRequired,
// };

export default TodoForm;
