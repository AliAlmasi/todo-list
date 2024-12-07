import { useEffect, useReducer, useState } from "react";

const initial = [
  {
    id: 123,
    text: "Buy groceries",
    done: true,
  },
  {
    id: 456,
    text: "Cook dinner",
    done: true,
  },
  {
    id: 789,
    text: "Invite friends",
    done: false,
  },
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const placeholders = [
  "Buy groceries",
  "Check car's engine",
  "Get that thing done",
  "Prepare for math exam",
  "Read the book",
  "Continue the course",
  "Plan the weekend",
  "Get high",
  "Cook dinner",
  "Clean up for the party",
  "Call Mom",
  "Invite friends",
];

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

function Header() {
  const d = new Date();

  const dateString = `${days[d.getDay()]} ${
    d.getMonth() < 10 ? "0" + d.getMonth() : d.getMonth()
  }/${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}`;

  return (
    <header className="header" onClick={() => {}}>
      <span>{dateString}</span>
      <h1>Todo List</h1>
    </header>
  );
}

function AddTodo({ todos, setTodos }) {
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

function List({ items, onToggle, onDelete }) {
  return items.length > 0 ? (
    <ul className="list">
      {items
        .sort((a, b) => Number(a.done) - Number(b.done))
        .map((obj) => (
          <ListItem
            obj={obj}
            onToggle={onToggle}
            onDelete={onDelete}
            key={obj.id}
          />
        ))}
    </ul>
  ) : (
    <p className="list">
      There's nothing to do.
      <br />
      Add something to list.
    </p>
  );
}

function ListItem({ obj, onToggle: handleToggle, onDelete: handleDelete }) {
  return (
    <li className="item">
      <input
        type="checkbox"
        checked={obj.done}
        onChange={() => handleToggle(obj.id)}
      />
      <span
        style={
          obj.done
            ? { textDecoration: "line-through 2px #495057", color: "#495057" }
            : {}
        }
        onClick={() => handleToggle(obj.id)}
      >
        {obj.text}
      </span>
      <button onClick={() => handleDelete(obj.id)}>X</button>
    </li>
  );
}

function ClearList({ onClear: handleClear }) {
  return (
    <button className="clear" onClick={handleClear}>
      Clear List
    </button>
  );
}

function Quote() {
  function newtab(href) {
    let a = document.createElement("a");
    a.href = href;
    a.setAttribute("target", "_blank");
    a.click();
    a.remove();
  }
  const [qod, setQod] = useState("");
  const [author, setAuthor] = useState("");
  const [loaded, setLoaded] = useState(false);
  async function getQod() {
    try {
      const res = await fetch("https://quotes-api-self.vercel.app/quote");
      const data = await res.json();
      if (!res.ok) throw new Error("Error when attempting to fetch quote.");
      setQod(data.quote);
      setAuthor(data.author);
      setLoaded(true);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getQod();
  }, []);

  return (
    loaded && (
      <div className="quote">
        <p>{qod}</p>
        <span onClick={() => newtab(`https://en.wikipedia.org/wiki/${author}`)}>
          - {author}
        </span>
      </div>
    )
  );
}

function Footer() {}
