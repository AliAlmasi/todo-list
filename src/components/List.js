import ListItem from "./ListItem";

export default function List({ items, onToggle, onDelete }) {
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
