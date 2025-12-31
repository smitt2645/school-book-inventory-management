import React, { useEffect, useState } from "react";
import { getClasses, createClass, deleteClass } from "../../api";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState("");

  const fetchClasses = async () => {
    const res = await getClasses();
    setClasses(res.data);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleAdd = async () => {
    if (!name) return alert("Enter Class Name");
    await createClass({ name });
    setName("");
    fetchClasses();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this class?")) {
      await deleteClass(id);
      fetchClasses();
    }
  };

  return (
    <div>
      <h2>Classes</h2>
      <input
        placeholder="Class Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Add Class</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassList;
