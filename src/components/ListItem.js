export default function ListItem({
  obj,
  onToggle: handleToggle,
  onDelete: handleDelete,
}) {
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
