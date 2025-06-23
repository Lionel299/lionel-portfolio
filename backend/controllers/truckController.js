const Truck = require('../models/truckModel');



exports.createTruck = async (req, res) => {
  try {
    const { brand, registration, maxWeight, owner } = req.body
    const truck = new Truck({ brand, registration, maxWeight, owner })
    await truck.save()
    res.status(201).json(truck)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}


// Obtenir tous les camions
exports.getTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find()
      .populate('owner', 'firstName lastName')  // Remplace owner (ObjectId) par prénom et nom
      .exec();

    res.json(trucks);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des camions' });
  }
};

// Obtenir un camion par ID
exports.getTruckById = async (req, res) => {
  const truck = await Truck.findById(req.params.id);
  if (!truck) return res.status(404).json({ error: 'Truck not found' });
  res.json(truck);
};

// Mettre à jour un camion
exports.updateTruck = async (req, res) => {
  const truck = await Truck.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!truck) return res.status(404).json({ error: 'Truck not found' });
  res.json(truck);
};

// Supprimer un camion
exports.deleteTruck = async (req, res) => {
  const truck = await Truck.findByIdAndDelete(req.params.id);
  if (!truck) return res.status(404).json({ error: 'Truck not found' });
  res.json({ message: 'Truck deleted' });
};

