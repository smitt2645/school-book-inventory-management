import React, { useEffect, useState } from "react";
import { getMediums, createMedium, deleteMedium } from "../../api";
import "../../components/commonStyle.css";
import Loader from "../../commonComponents/Loader";

const MediumList = () => {
  const [mediums, setMediums] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMediums = async () => {
    setLoading(true);
    const res = await getMediums();
    setMediums(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMediums();
  }, []);

  const handleAdd = async () => {
    if (!name) return alert("Enter Medium Name");
    setLoading(true);
    await createMedium({ name });
    setName("");
    await fetchMediums();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this medium?")) {
      setLoading(true);
      await deleteMedium(id);
      await fetchMediums();
    }
  };

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-title">Mediums</h2>

      <div className="dashboard-form">
        <input
          placeholder="Medium Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn-primary" onClick={handleAdd}>
          Add Medium
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
            {mediums?.length > 0 ? (
              mediums.map((m) => (
                <tr key={m?.id}>
                  <td>{m?.name}</td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(m.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="empty-text">
                  No mediums found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MediumList;
