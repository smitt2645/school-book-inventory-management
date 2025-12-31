const Year = require("../Models/academic_year");

exports.create = async (req, res) => {
  try {
    const year = await Year.create(req.body);
    res.status(201).json(year);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const years = await Year.findAll();
    res.json(years);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const year = await Year.findByPk(req.params.id);
    if (!year) return res.status(404).json({ error: "not found" });
    await year.update(req.body);
    res.json(year);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Year.destroy({ where: { id: req.params.id } });
    res.json({ message: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
