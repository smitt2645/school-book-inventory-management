const Board = require("../Models/board");

exports.create = async (req, res) => {
  try {
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const boards = await Board.findAll();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const board = await Board.findByPk(req.params.id);
    if (!board) return res.status(404).json({ error: "not found" });
    await board.update(req.body);
    res.json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Board.destroy({ where: { id: req.params.id } });
    res.json({ message: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
