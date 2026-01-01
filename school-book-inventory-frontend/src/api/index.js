import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://school-backend.onrender.com/api/v1"
    : "http://localhost:5000/api/v1";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api/v1",
//   headers: { "Content-Type": "application/json" },
// });

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Boards
export const getBoards = () => api.get("/board");
export const createBoard = (data) => api.post("/board/create", data);
export const deleteBoard = (id) => api.delete(`/board/${id}`);

// Mediums
export const getMediums = () => api.get("/medium");
export const createMedium = (data) => api.post("/medium/create", data);
export const deleteMedium = (id) => api.delete(`/medium/${id}`);

// Classes
export const getClasses = () => api.get("/class");
export const createClass = (data) => api.post("/class/create", data);
export const deleteClass = (id) => api.delete(`/class/${id}`);

// Years
export const getYears = () => api.get("/year");
export const createYear = (data) => api.post("/year/create", data);
export const deleteYear = (id) => api.delete(`/year/${id}`);

// Books
export const getBooks = () => api.get("/book");
export const createBook = (data) => api.post("/book/create", data);
export const deleteBook = (id) => api.delete(`/book/${id}`);

// Book Sets
export const getBookSets = (filters = {}) =>
  api.get("/book-set", { params: filters });
export const createBookSet = (data) => api.post("/book-set/create", data);
export const updateBookSet = (id, data) => api.put(`/book-set/${id}`, data);
export const deleteBookSet = (id) => api.delete(`/book-set/${id}`);

export default api;
