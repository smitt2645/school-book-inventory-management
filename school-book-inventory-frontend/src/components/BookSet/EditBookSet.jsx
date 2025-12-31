import React, { useState, useEffect, useContext } from "react";
import { BookSetContext } from "../../context/BookSetContext";
import { getBooks, getBookSets, updateBookSet } from "../../api";

const EditBookSet = ({ bookSetId, onClose }) => {
  const { boards, mediums, classes, years, books } = useContext(BookSetContext);

  const [form, setForm] = useState({
    board_id: "",
    medium_id: "",
    class_id: "",
    year_id: "",
    set_name: "",
  });
  const [selectedBooks, setSelectedBooks] = useState([]);

  useEffect(() => {
    const fetchSet = async () => {
      const res = await getBookSets();
      const setToEdit = res.data.find((s) => s.id === bookSetId);
      if (!setToEdit) return;

      setForm({
        board_id: setToEdit.board_id,
        medium_id: setToEdit.medium_id,
        class_id: setToEdit.class_id,
        year_id: setToEdit.year_id,
        set_name: setToEdit.set_name,
      });

      const bookItems = setToEdit.bookSetItems.map((b) => ({
        book_id: b.book.id,
        quantity: b.quantity || 1,
      }));
      setSelectedBooks(bookItems);
    };

    fetchSet();
  }, [bookSetId]);

  const toggleBook = (bookId) => {
    if (selectedBooks.find((b) => b.book_id === bookId)) {
      setSelectedBooks(selectedBooks.filter((b) => b.book_id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, { book_id: bookId, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (bookId, qty) => {
    setSelectedBooks(
      selectedBooks.map((b) =>
        b.book_id === bookId ? { ...b, quantity: Number(qty) } : b
      )
    );
  };

  const handleSubmit = async () => {
    if (
      !form.board_id ||
      !form.medium_id ||
      !form.class_id ||
      !form.year_id ||
      !form.set_name ||
      selectedBooks.length === 0
    ) {
      return alert("Fill all fields and select books");
    }
    await updateBookSet(bookSetId, { ...form, books: selectedBooks });
    alert("Book Set Updated!");
    if (onClose) onClose();
  };

  return (
    <div className="edit-book-set">
      <h2>Edit Book Set</h2>

      <div>
        <select
          value={form.board_id}
          onChange={(e) => setForm({ ...form, board_id: e.target.value })}
        >
          <option value="">Select Board</option>
          {boards.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <select
          value={form.medium_id}
          onChange={(e) => setForm({ ...form, medium_id: e.target.value })}
        >
          <option value="">Select Medium</option>
          {mediums.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <select
          value={form.class_id}
          onChange={(e) => setForm({ ...form, class_id: e.target.value })}
        >
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={form.year_id}
          onChange={(e) => setForm({ ...form, year_id: e.target.value })}
        >
          <option value="">Select Year</option>
          {years.map((y) => (
            <option key={y.id} value={y.id}>
              {y.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input
          type="text"
          placeholder="Set Name"
          value={form.set_name}
          onChange={(e) => setForm({ ...form, set_name: e.target.value })}
        />
      </div>

      <div className="book-list">
        <h3>Select Books ({selectedBooks.length})</h3>
        {books.map((b) => {
          const selected = selectedBooks.find((sb) => sb.book_id === b.id);
          return (
            <div key={b.id}>
              <input
                type="checkbox"
                checked={!!selected}
                onChange={() => toggleBook(b.id)}
              />
              {b.book_name} ({b.subject})
              {selected && (
                <input
                  type="number"
                  min="1"
                  value={selected.quantity}
                  onChange={(e) => handleQuantityChange(b.id, e.target.value)}
                  style={{ width: "50px", marginLeft: "10px" }}
                />
              )}
            </div>
          );
        })}
      </div>

      <button onClick={handleSubmit}>Update Book Set</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditBookSet;
