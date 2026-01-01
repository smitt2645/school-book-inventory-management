import React, { useState, useEffect } from "react";
import { getBoards, createBoard, deleteBoard } from "../../api";
import "../../components/commonStyle.css";
import Loader from "../../commonComponents/Loader";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBoards = async () => {
    setLoading(true);
    const res = await getBoards();
    setBoards(res?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleAdd = async () => {
    if (!name) return alert("Enter Board Name");
    setLoading(true);
    await createBoard({ name });
    setName("");
    await fetchBoards();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this board?")) {
      setLoading(true);
      await deleteBoard(id);
      await fetchBoards();
    }
  };

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-title">Boards</h2>

      <div className="dashboard-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Board Name"
        />
        <button className="btn-primary" onClick={handleAdd}>
          Add Board
        </button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {boards.length > 0 ? (
              boards.map((b) => (
                <tr key={b?.id}>
                  <td>{b?.name}</td>
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
                <td colSpan="2" className="empty-text">
                  No boards found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BoardList;
