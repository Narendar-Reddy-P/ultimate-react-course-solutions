import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id !== id ? item : { ...item, packed: !item.packed },
      ),
    );
  }
  function handleDeleteAllItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items",
    );
    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onDeleteAllItems={handleDeleteAllItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴FAR AWAY🎒</h1>;
}
function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: crypto.randomUUID(),
    };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>ADD</button>
    </form>
  );
}
function PackingList({ items, onDeleteItem, onToggleItem, onDeleteAllItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  } else if (sortBy === "Description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="Input">SORT BY INPUT ORDER</option>
          <option value="Description">SORT BY DESCRIPTION</option>
          <option value="Status">SORT BY PACKED STATUS</option>
        </select>
        <button onClick={onDeleteAllItems}>CLEAR LIST</button>
      </div>
    </div>
  );
}
function Stats({ items }) {
  if (!items.length) {
    return <div className="stats">Add items to the list</div>;
  }

  let packedItems = items.filter((items) => items.packed === true).length;
  let percentage = Math.round((packedItems / items.length) * 100);

  if (percentage === 100) {
    return <div className="stats">Everything is packed. Let's go ✈️.</div>;
  }

  return (
    <div className="stats">
      You have {items.length} items on your list, and you alredy packed{" "}
      {packedItems} ({percentage} %)
    </div>
  );
}
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <div
        style={item.packed ? { "text-decoration": "line-through" } : null}
      >{`${item.quantity} ${item.description}`}</div>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

export default App;
