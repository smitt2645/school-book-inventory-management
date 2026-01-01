import React, { useState } from "react";
import CreateBookSet from "../components/BookSet/CreateBookSet";
import BookSetList from "../components/BookSet/BookSetList";
import EditBookSet from "../components/BookSet/EditBookSet";
// import "../../components/commonStyle.css";
import "../components/commonStyle.css";

const BookSetPanel = () => {
  const [editId, setEditId] = useState(null);
  const [showCreate, setShowCreate] = useState(false);

  if (editId)
    return <EditBookSet bookSetId={editId} onClose={() => setEditId(null)} />;
  if (showCreate) return <CreateBookSet onClose={() => setShowCreate(false)} />;

  return (
    <div>
      <button className="dashboard-title" onClick={() => setShowCreate(true)}>
        Create Book Set
      </button>
      <BookSetList onEdit={setEditId} />
    </div>
  );
};

export default BookSetPanel;
