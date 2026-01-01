import React, { useEffect, useState } from "react";
import { getYears, createYear, deleteYear } from "../../api";
import Loader from "../../commonComponents/Loader";

const AcademicYear = () => {
  const [years, setYears] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchYears = async () => {
    setLoading(true);
    const res = await getYears();
    setYears(res?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchYears();
  }, []);

  const handleAdd = async () => {
    if (!name) return alert("Enter Year Name");
    setLoading(true);
    await createYear({ name });
    setName("");
    await fetchYears();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this year?")) {
      setLoading(true);
      await deleteYear(id);
      await fetchYears();
    }
  };

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-title">Academic Years</h2>

      <div className="dashboard-form">
        <input
          placeholder="Year Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn-primary" onClick={handleAdd}>
          Add Year
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
            {years?.length > 0 ? (
              years.map((y) => (
                <tr key={y?.id}>
                  <td>{y?.name}</td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(y?.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="empty-text">
                  No academic years found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AcademicYear;
