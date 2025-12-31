import React from "react";
import BoardList from "./../components/Board/BoardList";
import MediumList from "./../components/Medium/MediumList";
import ClassList from "./../components/Class/ClassList";
import YearList from "./../components/AcademicYear/AcademicYear";
import BookList from "./../components/Book/BookList";
import BookSetPanel from "./BookSetPanel";

const Dashboard = () => (
  <div>
    <h1>School Book Inventory Dashboard</h1>
    <BoardList />
    <MediumList />
    <ClassList />
    <YearList />
    <BookList />
    <BookSetPanel />
  </div>
);

export default Dashboard;
