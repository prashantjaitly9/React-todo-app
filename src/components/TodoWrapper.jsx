import React, { useEffect, useState } from "react";
import TodoForm from "./TodoForm.jsx";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo.jsx";
import EditTodoForm from "./EditTodoForm.jsx";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Function to save todos to localStorage
  const saveToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  // Add a new todo
  const addTodo = (todo) => {
    const newTodos = [
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ];
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  // Toggle complete status
  const toggleComplete = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  // Delete a todo
  const deleteTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  // Toggle edit mode
  const editTodo = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  // Update the task after editing
  const editTask = (task, id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
    );
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  return (
    <div className="TodoWrapper">
      <h1>Add Your Tasks Here!</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          <Todo
            task={todo}
            key={todo.id}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};

export default TodoWrapper;
