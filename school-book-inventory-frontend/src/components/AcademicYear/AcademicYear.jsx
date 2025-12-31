import React, { useEffect, useState } from "react";
import { getYears, createYear, deleteYear } from "../../api";

const AcademicYear = () => {
  const [years, setYears] = useState([]);
  const [name, setName] = useState("");

  const fetchYears = async () => {
    const res = await getYears();
    setYears(res.data);
  };

  useEffect(() => {
    fetchYears();
  }, []);

  const handleAdd = async () => {
    if (!name) return alert("Enter Year Name");
    await createYear({ name });
    setName("");
    fetchYears();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this year?")) {
      await deleteYear(id);
      fetchYears();
    }
  };

  return (
    <div>
      <h2>Academic Years</h2>
      <input
        placeholder="Year Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAdd}>Add Year</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {years.map((y) => (
            <tr key={y.id}>
              <td>{y.name}</td>
              <td>
                <button onClick={() => handleDelete(y.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AcademicYear;
