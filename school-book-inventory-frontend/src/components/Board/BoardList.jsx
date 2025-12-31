import React, { useState, useEffect } from "react";
import { getBoards, createBoard, deleteBoard } from "../../api";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [name, setName] = useState("");

  const fetchBoards = async () => {
    const res = await getBoards();
    setBoards(res.data);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleAdd = async () => {
    if (!name) return alert("Enter Board Name");
    await createBoard({ name });
    setName("");
    fetchBoards();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this board?")) {
      await deleteBoard(id);
      fetchBoards();
    }
  };

  return (
    <div>
      <h2>Boards</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Board Name"
      />
      <button onClick={handleAdd}>Add Board</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
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

export default BoardList;
