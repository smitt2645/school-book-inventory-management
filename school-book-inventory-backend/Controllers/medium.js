const Medium = require("../Models/medium");

exports.create = async (req, res) => {
  try {
    const medium = await Medium.create(req.body);
    res.status(201).json(medium);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const mediums = await Medium.findAll();
    res.json(mediums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const medium = await Medium.findByPk(req.params.id);
    if (!medium) return res.status(404).json({ error: "not found" });
    await medium.update(req.body);
    res.json(medium);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Medium.destroy({ where: { id: req.params.id } });
    res.json({ message: "deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
