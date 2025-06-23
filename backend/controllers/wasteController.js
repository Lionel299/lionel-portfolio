const Waste = require('../models/wasteModel');

// Créer un déchet
exports.createWaste = async (req, res) => {
  try {
    const waste = new Waste(req.body);
    await waste.save();
    res.status(201).json(waste);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lister tous les déchets
exports.getWastes = async (req, res) => {
  const wastes = await Waste.find().populate('reportedBy');
  res.json(wastes);
};

// Détail d’un déchet
exports.getWasteById = async (req, res) => {
  const waste = await Waste.findById(req.params.id).populate('reportedBy');
  if (!waste) return res.status(404).json({ error: 'Waste not found' });
  res.json(waste);
};

// Modifier un déchet
exports.updateWaste = async (req, res) => {
  const waste = await Waste.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!waste) return res.status(404).json({ error: 'Waste not found' });
  res.json(waste);
};

// Supprimer un déchet
exports.deleteWaste = async (req, res) => {
  const waste = await Waste.findByIdAndDelete(req.params.id);
  if (!waste) return res.status(404).json({ error: 'Waste not found' });
  res.json({ message: 'Waste deleted' });
};
