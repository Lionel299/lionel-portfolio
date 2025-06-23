const Collection = require('../models/collectionModel');

// Créer une collecte
exports.createCollection = async (req, res) => {
  try {
    const collection = new Collection(req.body);
    await collection.save();
    res.status(201).json(collection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lister toutes les collectes
exports.getCollections = async (req, res) => {
  const collections = await Collection.find().populate('waste collector');
  res.json(collections);
};

// Détail d’une collecte
exports.getCollectionById = async (req, res) => {
  const collection = await Collection.findById(req.params.id).populate('waste collector');
  if (!collection) return res.status(404).json({ error: 'Collection not found' });
  res.json(collection);
};

// Modifier une collecte
exports.updateCollection = async (req, res) => {
  const collection = await Collection.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!collection) return res.status(404).json({ error: 'Collection not found' });
  res.json(collection);
};

// Supprimer une collecte
exports.deleteCollection = async (req, res) => {
  const collection = await Collection.findByIdAndDelete(req.params.id);
  if (!collection) return res.status(404).json({ error: 'Collection not found' });
  res.json({ message: 'Collection deleted' });
};
