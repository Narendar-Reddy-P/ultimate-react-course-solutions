import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  let [friends, setFriends] = useState(initialFriends);
  let [isAddFriendFormOpen, setIsAddFriendFormOpen] = useState(false);
  let [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddFriend(friend) {
    setFriends([...friends, friend]);
    setIsAddFriendFormOpen(false);
  }

  function handleSelectedFriend(friend) {
    if (selectedFriend?.id === friend.id) {
      setSelectedFriend(null);
    } else {
      setSelectedFriend(friend);
    }
    // other way to write this function: setSelectedFriend((cur) => (cur.id === friend.id ? null : friend));
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend,
      ),
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelectedFriend={handleSelectedFriend}
          selectedFriend={selectedFriend}
        />
        {isAddFriendFormOpen && (
          <FormAddFriend friends={friends} onAddFriend={handleAddFriend} />
        )}
        <Button onClick={() => setIsAddFriendFormOpen(!isAddFriendFormOpen)}>
          {isAddFriendFormOpen ? "Close" : "AddFriend"}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function FriendsList({ onSelectedFriend, selectedFriend, friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          onSelectedFriend={onSelectedFriend}
          selectedFriend={selectedFriend}
          className={selectedFriend?.id === friend.id && "selected"}
          key={friend.id}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectedFriend, selectedFriend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />

      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">{`You owe ${friend.name} ₹ ${Math.abs(friend.balance)}`}</p>
      )}
      {friend.balance > 0 && (
        <p className="green">{`${friend.name} owes you ₹ ${friend.balance}`}</p>
      )}
      {friend.balance === 0 && <p>{`You and ${friend.name} are even`}</p>}

      <Button onClick={() => onSelectedFriend(friend)}>
        {selectedFriend?.id === friend.id ? "close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };

    setName("");
    setImage("https://i.pravatar.cc/48");

    onAddFriend(newFriend);
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🖼️ Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoPaid, setWhoPaid] = useState("You");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoPaid === "You" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH {selectedFriend.name}</h2>
      <label>💰Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>👦Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value),
          )
        }
      />

      <label>🧑‍🤝‍🧑 {selectedFriend.name}'s expense</label>
      <input type="text" value={paidByFriend} disabled />

      <label>🤑Who is paying the bill</label>
      <select value={whoPaid} onChange={(e) => setWhoPaid(e.target.value)}>
        <option value="You">You</option>
        <option value={selectedFriend.name}>{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
export default App;

//-neg you owe friend, ++ friend owes you
//rendering items using map --- must provide key attribute
//if friend paid -yourbill in friends balance
//if you paid +friendsbill in friends balance
//Use 3 times nested operator instead of nested ternary
