import { days } from "../data";

export default function Header() {
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
