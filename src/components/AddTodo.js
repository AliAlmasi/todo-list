import { useState } from "react";
import { placeholders } from "../data";

export default function AddTodo({ todos, setTodos }) {
  const [text, setText] = useState("");
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!text) return;
    const newTodo = {
      id: Date.now(),
      text,
      done: false,
    };
    setTodos((curr) => [...curr, newTodo]);
    setText("");
  };

  return (
    <form className="add-todo">
      <input
        type="text"
        placeholder={
          placeholders[Math.round(Math.random() * (placeholders.length - 1))]
        }
        maxLength={40}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={(e) => handleAddTodo(e)}>Add</button>
    </form>
  );
}
