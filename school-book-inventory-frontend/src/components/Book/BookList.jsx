import React, { useEffect, useState, useContext } from "react";
import { getBooks, createBook, deleteBook } from "../../api";
import { BookSetContext } from "../../context/BookSetContext";
import "../../components/commonStyle.css";
import Loader from "../../commonComponents/Loader";

const BookList = () => {
  const { setBooks } = useContext(BookSetContext);
  const [list, setList] = useState([]);
  const [bookName, setBookName] = useState("");
  const [subject, setSubject] = useState("");
  const [publisher, setPublisher] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    const res = await getBooks();
    setList(res?.data);
    setBooks(res?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAdd = async () => {
    if (!bookName || !subject || !publisher) return alert("Fill all fields");
    setLoading(true);
    await createBook({ book_name: bookName, subject, publisher: publisher });
    setBookName("");
    setSubject("");
    setPublisher("");
    fetchBooks();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this book?")) {
      setLoading(true);
      await deleteBook(id);
      fetchBooks();
    }
  };

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-title">Books</h2>

      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboard-form">
            <input
              placeholder="Name"
              name="book_name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <input
              placeholder="Subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <input
              placeholder="Publisher"
              value={publisher}
              name="publisher"
              onChange={(e) => setPublisher(e.target.value)}
            />
            <button className="btn-primary" onClick={handleAdd}>
              Add Book
            </button>
          </div>

          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Publisher</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 ? (
                list.map((b) => (
                  <tr key={b?.id}>
                    <td>{b?.book_name || "not available"}</td>
                    <td>{b?.subject || "not available"}</td>
                    <td>{b?.publisher || "not available"}</td>
                    <td>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(b?.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="empty-text">
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default BookList;
