export default function ClearList({ onClear: handleClear }) {
  return (
    <button className="clear" onClick={handleClear}>
      Clear List
    </button>
  );
}
