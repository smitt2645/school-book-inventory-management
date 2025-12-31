import React, { useEffect, useState, useContext } from "react";
import { getBooks, createBook, deleteBook } from "../../api";
import { BookSetContext } from "../../context/BookSetContext";

const BookList = () => {
  const { setBooks } = useContext(BookSetContext);
  const [list, setList] = useState([]);
  const [bookName, setBookName] = useState("");
  const [subject, setSubject] = useState("");
  const [publisher, setPublisher] = useState("");

  const fetchBooks = async () => {
    const res = await getBooks();
    setList(res.data);
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAdd = async () => {
    if (!bookName || !subject || !publisher) return alert("Fill all fields");
    await createBook({ book_name: bookName, subject, publisher: publisher });
    setBookName("");
    setSubject("");
    setPublisher("");
    fetchBooks();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this book?")) {
      await deleteBook(id);
      fetchBooks();
    }
  };

  return (
    <div>
      <h2>Books</h2>
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
      <button onClick={handleAdd}>Add Book</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Publisher</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((b) => (
            <tr key={b.id}>
              <td>{b.book_name || "not available"}</td>
              <td>{b.subject || "not available"}</td>
              <td>{b.publisher || "not available"}</td>
              <td>
                <button onClick={() => handleDelete(b.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
