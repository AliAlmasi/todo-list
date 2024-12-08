import { useState } from "react";

import { initial } from "./data";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import List from "./components/List";
import ClearList from "./components/ClearList";
import Quote from "./components/Quote";
import Footer from "./components/Footer";

export default function App() {
  const [todos, setTodos] = useState(initial);

  const handleToggle = (id) =>
    setTodos((curr) =>
      curr.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );

  const handleDelete = (id) =>
    setTodos((curr) => curr.filter((todo) => todo.id !== id));

  const handleClear = () => window.confirm("Are you sure?") && setTodos([]);

  return (
    <div className="app">
      <Header />
      <AddTodo todos={todos} setTodos={setTodos} />
      <List items={todos} onToggle={handleToggle} onDelete={handleDelete} />
      <ClearList onClear={handleClear} />
      <Quote />
      <Footer />
    </div>
  );
}
