import React, { useState, useEffect, useContext } from "react";
import { BookSetContext } from "../../context/BookSetContext";
import { getBookSets, deleteBookSet } from "../../api";
import "../../components/commonStyle.css";
import Loader from "../../commonComponents/Loader";

const BookSetList = ({ onEdit }) => {
  const { boards, mediums, classes, years } = useContext(BookSetContext);
  const [bookSets, setBookSets] = useState([]);
  console.log("bookSets::::::", bookSets);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    board_id: "",
    medium_id: "",
    class_id: "",
    year_id: "",
  });

  const fetchSets = async () => {
    setLoading(true);
    const res = await getBookSets(filters);
    setBookSets(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSets();
  }, [filters]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this Book Set?")) {
      setLoading(true);
      await deleteBookSet(id);
      await fetchSets();
    }
  };

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-title">Book Sets</h2>

      <div className="dashboard-form">
        <select
          value={filters.board_id}
          onChange={(e) => setFilters({ ...filters, board_id: e.target.value })}
        >
          <option value="">Board</option>
          {boards.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        <select
          value={filters.medium_id}
          onChange={(e) =>
            setFilters({ ...filters, medium_id: e.target.value })
          }
        >
          <option value="">Medium</option>
          {mediums.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <select
          value={filters.class_id}
          onChange={(e) => setFilters({ ...filters, class_id: e.target.value })}
        >
          <option value="">Class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={filters.year_id}
          onChange={(e) => setFilters({ ...filters, year_id: e.target.value })}
        >
          <option value="">Year</option>
          {years?.map((y) => (
            <option key={y?.id} value={y.id}>
              {y?.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Set Name</th>
              <th>Board</th>
              <th>Medium</th>
              <th>Class</th>
              <th>Year</th>
              <th>Books</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookSets?.map((bs) => (
              <tr key={bs.id}>
                <td>{bs?.set_name || ""}</td>
                <td>{bs?.board?.name || ""}</td>
                <td>{bs?.medium?.name || ""}</td>
                <td>{bs?.class?.name || ""}</td>
                <td>{bs?.year?.name || ""}</td>
                <td>
                  {bs?.bookSetItems?.map((b) => b?.book?.book_name).join(", ")}
                </td>
                <td>
                  <button className="btn-primary" onClick={() => onEdit(bs.id)}>
                    Edit
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(bs.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookSetList;
