import React from "react";
import BoardList from "../components/Board/BoardList";
import MediumList from "../components/Medium/MediumList";
import ClassList from "../components/Class/ClassList";
import YearList from "../components/AcademicYear/AcademicYear";
import BookList from "../components/Book/BookList";
import BookSetPanel from "./BookSetPanel";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>School Book Inventory</h1>
        <p>Admin Dashboard</p>
      </header>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Boards</h2>
          <BoardList />
        </div>

        <div className="card">
          <h2>Mediums</h2>
          <MediumList />
        </div>

        <div className="card">
          <h2>Classes</h2>
          <ClassList />
        </div>

        <div className="card">
          <h2>Academic Years</h2>
          <YearList />
        </div>
      </div>

      <div className="card full-width">
        <h2>Books</h2>
        <BookList />
      </div>

      <div className="card full-width">
        <h2>Book Sets</h2>
        <BookSetPanel />
      </div>
    </div>
  );
};

export default Dashboard;
