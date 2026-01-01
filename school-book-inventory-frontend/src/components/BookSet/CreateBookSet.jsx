import React, { useState, useContext } from "react";
import { BookSetContext } from "../../context/BookSetContext";
import { createBookSet } from "../../api";
import "../../components/commonStyle.css";
import Loader from "../../commonComponents/Loader";

const CreateBookSet = ({ onClose }) => {
  const { boards, mediums, classes, years, books } = useContext(BookSetContext);
  const [form, setForm] = useState({
    board_id: "",
    medium_id: "",
    class_id: "",
    year_id: "",
    set_name: "",
  });
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleBook = (bookId) => {
    if (selectedBooks?.find((b) => b?.book_id === bookId)) {
      setSelectedBooks(selectedBooks?.filter((b) => b.book_id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, { book_id: bookId, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (bookId, qty) => {
    setSelectedBooks(
      selectedBooks?.map((b) =>
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
    setLoading(true);
    await createBookSet({ ...form, books: selectedBooks });
    setLoading(false);
    alert("Book Set Created!");
    if (onClose) onClose();
  };

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-title">Create Book Set</h2>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard-form">
            <select
              value={form.board_id}
              onChange={(e) => setForm({ ...form, board_id: e.target.value })}
            >
              <option value="">Board</option>
              {boards?.map((b) => (
                <option key={b?.id} value={b.id}>
                  {b?.name}
                </option>
              ))}
            </select>

            <select
              value={form.medium_id}
              onChange={(e) => setForm({ ...form, medium_id: e.target.value })}
            >
              <option value="">Medium</option>
              {mediums?.map((m) => (
                <option key={m?.id} value={m.id}>
                  {m?.name}
                </option>
              ))}
            </select>

            <select
              value={form.class_id}
              onChange={(e) => setForm({ ...form, class_id: e.target.value })}
            >
              <option value="">Class</option>
              {classes?.map((c) => (
                <option key={c?.id} value={c.id}>
                  {c?.name}
                </option>
              ))}
            </select>

            <select
              value={form.year_id}
              onChange={(e) => setForm({ ...form, year_id: e.target.value })}
            >
              <option value="">Year</option>
              {years?.map((y) => (
                <option key={y?.id} value={y.id}>
                  {y?.name}
                </option>
              ))}
            </select>

            <input
              placeholder="Set Name"
              value={form.set_name}
              onChange={(e) => setForm({ ...form, set_name: e.target.value })}
            />
          </div>

          <h3 className="section-title">Books ({selectedBooks.length})</h3>

          <div className="book-list">
            {books?.map((b) => {
              const selected = selectedBooks?.find((sb) => sb.book_id === b.id);
              return (
                <div key={b.id} className="book-item">
                  <input
                    type="checkbox"
                    checked={!!selected}
                    onChange={() => toggleBook(b.id)}
                  />
                  <span>
                    {b.book_name} ({b.subject})
                  </span>
                  {selected && (
                    <input
                      type="number"
                      min="1"
                      value={selected.quantity}
                      onChange={(e) =>
                        handleQuantityChange(b.id, e.target.value)
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="action-row">
            <button className="btn-primary" onClick={handleSubmit}>
              Save
            </button>
            <button className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateBookSet;
