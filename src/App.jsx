import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import InputForm from "./components/InputForm";
import TodoItem from "./components/TodoItem";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const addTodo = (task) => {
    if (task.trim()) {
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setTodos([
        ...todos,
        { id: Date.now(), task, completed: false, date: time },
      ]);
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="todo-list">
      <Header />
      <div className="theme-toggle" onClick={toggleTheme}>
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: theme === "light" ? 1 : 1.2, rotate: theme === "light" ? 0 : 180 }}
          transition={{ duration: 0.5 }}
        >
          {theme === "light" ? "🌞" : "🌙"}
        </motion.div>
      </div>
      <InputForm onAdd={addTodo} />
      <ul>
        <AnimatePresence>
          {todos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="empty-state"
            >
              🎉 You're all caught up! Add a task to get started.
            </motion.div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                task={todo.task}
                completed={todo.completed}
                date={todo.date}
                onToggle={() => toggleTodo(todo.id)}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default App;
