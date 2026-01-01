import React, { useEffect, useState } from "react";
import { getClasses, createClass, deleteClass } from "../../api";
import "../../components/commonStyle.css";
import Loader from "../../commonComponents/Loader";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchClasses = async () => {
    setLoading(true);
    const res = await getClasses();
    setClasses(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleAdd = async () => {
    if (!name) return alert("Enter Class Name");
    setLoading(true);
    await createClass({ name });
    setName("");
    await fetchClasses();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this class?")) {
      setLoading(true);
      await deleteClass(id);
      await fetchClasses();
    }
  };

  return (
    <div className="dashboard-card">
      <h2 className="dashboard-title">Classes</h2>

      <div className="dashboard-form">
        <input
          placeholder="Class Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn-primary" onClick={handleAdd}>
          Add Class
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
            {classes?.length > 0 ? (
              classes.map((c) => (
                <tr key={c?.id}>
                  <td>{c?.name}</td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="empty-text">
                  No classes found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClassList;
