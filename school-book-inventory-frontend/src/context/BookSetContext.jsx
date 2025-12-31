import React, { createContext, useState, useEffect } from "react";
import { getBoards, getMediums, getClasses, getYears, getBooks } from "../api";

export const BookSetContext = createContext();

export const BookSetProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [mediums, setMediums] = useState([]);
  const [classes, setClasses] = useState([]);
  const [years, setYears] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [b, m, c, y, bk] = await Promise.all([
      getBoards(),
      getMediums(),
      getClasses(),
      getYears(),
      getBooks(),
    ]);
    setBoards(b.data);
    setMediums(m.data);
    setClasses(c.data);
    setYears(y.data);
    setBooks(bk.data);
  };

  return (
    <BookSetContext.Provider
      value={{
        boards,
        mediums,
        classes,
        years,
        books,
        setBooks,
      }}
    >
      {children}
    </BookSetContext.Provider>
  );
};
