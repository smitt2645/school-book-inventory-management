const BookSet = require("../Models/bookSet");
const BookSetItem = require("../Models/bookSetItem");
const Book = require("../Models/book");

exports.create = async (req, res) => {
  try {
    const { board_id, medium_id, class_id, year_id, set_name, books } =
      req.body;
    const set = await BookSet.create({
      board_id,
      medium_id,
      class_id,
      year_id,
      set_name,
    });
    for (const b of books) {
      await BookSetItem.create({ book_set_id: set.id, book_id: b.book_id });
    }
    res.status(201).json(set);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const filters = req.query;
    const sets = await BookSet.findAll({
      where: filters,
      include: [{ model: BookSetItem, include: [Book] }],
    });
    res.json(sets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { board_id, medium_id, class_id, year_id, set_name, books } =
      req.body;
    const set = await BookSet.findByPk(id);
    if (!set) return res.status(404).json({ error: "not found" });
    await set.update({ board_id, medium_id, class_id, year_id, set_name });
    if (books) {
      await BookSetItem.destroy({ where: { book_set_id: id } });
      for (const b of books) {
        await BookSetItem.create({ book_set_id: id, book_id: b.book_id });
      }
    }
    res.json(set);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await BookSetItem.destroy({ where: { book_set_id: id } });
    await BookSet.destroy({ where: { id } });
    res.json({ message: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
