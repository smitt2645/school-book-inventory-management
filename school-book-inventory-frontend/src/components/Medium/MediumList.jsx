import React, { useEffect, useState } from "react";
import { getMediums, createMedium, deleteMedium } from "../../api";

const MediumList = () => {
  const [mediums, setMediums] = useState([]);
  const [name, setName] = useState("");

  const fetchMediums = async () => {
    const res = await getMediums();
    setMediums(res.data);
  };

  useEffect(() => {
    fetchMediums();
  }, []);

  const handleAdd = async () => {
    if (!name) return alert("Enter Medium Name");
    await createMedium({ name });
    setName("");
    fetchMediums();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this medium?")) {
      await deleteMedium(id);
      fetchMediums();
    }
  };

  return (
    <div>
      <h2>Mediums</h2>
      <input
        placeholder="Medium Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Add Medium</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mediums.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>
                <button onClick={() => handleDelete(m.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MediumList;
