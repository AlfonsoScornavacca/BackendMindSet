/* easdslint-disable consistent-return */
const Companies = require('../models/companies');

const { validate } = require('../validators/validators');

const getAll = (req, res) => {
  Companies.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message: `Error adding company: ${err}` }));
};

const getById = (req, res) => {
  Companies.findById(req.params.id)
    .then((found) => res.json(found))
    .catch((err) => res.status(404).json({ message: `Company not found with id: ${req.params.id}`, err }));
};

const getByName = (req, res) => {
  Companies.find({ name: req.params.name })
    .then((companies) => {
      if (companies.length === 0) {
        return res.status(404).json({ message: `Company not found with name: ${req.params.name}` });
      }
      return res.json(companies);
    })
    .catch((err) => res.status(500).json({ message: err }));
};

const add = (req, res) => {
  if (Object.keys(req.body).length === 0) return res.status(400).json({ message: 'Body empty' });
  const loadedCompany = {
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    province: req.body.province,
    country: req.body.country,
    zipCode: req.body.zipCode,
    phone: req.body.phone,
    email: req.body.email,
    contactFullName: req.body.contactFullName,
    contactPhone: req.body.contactPhone,
  };
  if (validate(loadedCompany)) {
    return res.status(400).json({ message: `Missing parameters: ${validate(loadedCompany)}` });
  }
  loadedCompany.isActive = req.body.isActive || true;
  loadedCompany.pictureUrl = req.body.pictureUrl || null;
  const createdCompany = new Companies(loadedCompany);
  return createdCompany
    .save()
    .then(() => res.json({ message: 'Company added successfully', Company: createdCompany }))
    .catch((err) => {
      res.status(500).json({ message: `Error adding company: ${err}` });
    });
};

const edit = (req, res) => {
  if (Object.keys(req.body).length === 0) return res.status(400).json({ message: 'Body empty' });
  return Companies.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec()
    .then((found) => res.json({ message: 'Company edited successfully', Company: found }))
    .catch((err) => {
      res.status(500).json({ message: 'Error editing company', err });
    });
};

const remove = (req, res) => {
  Companies.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.json({ message: 'Company deleted' }))
    .catch((err) => {
      res.status(500).json({ message: 'Error deleting Company', err });
    });
};

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  edit,
  remove,
};
