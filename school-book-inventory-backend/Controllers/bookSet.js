const BookSet = require("../Models/bookSet");
const BookSetItem = require("../Models/bookSetItem");
const Book = require("../Models/book");
const Board = require("../Models/board");
const Medium = require("../Models/medium");
const Class = require("../Models/class");
const AcademicYear = require("../Models/academic_year");

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
    const { board_id, medium_id, class_id, year_id } = req.query;

    // 🔥 build clean where object
    const where = {};
    if (board_id) where.board_id = board_id;
    if (medium_id) where.medium_id = medium_id;
    if (class_id) where.class_id = class_id;
    if (year_id) where.year_id = year_id;

    console.log("FINAL FILTERS:", where);

    const sets = await BookSet.findAll({
      where,
      include: [
        {
          model: Board,
        },
        {
          model: Medium,
        },
        {
          model: Class,
        },
        {
          model: AcademicYear,
        },
        {
          model: BookSetItem,
          // as: "bookSetItems",
          include: [
            {
              model: Book,
            },
          ],
        },
      ],
    });

    res.json(sets);
  } catch (err) {
    console.error(err);
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
