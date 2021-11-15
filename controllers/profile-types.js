const ProfileTypes = require('../models/Profile-types');

const getAll = (req, res) => {
  ProfileTypes.find()
    .then((profileType) => res.json(profileType))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const id = req.params;
  ProfileTypes.findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `No profile type founded on ID: ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getByName = (req, res) => {
  const text = req.query;
  ProfileTypes.find({ name: text.toLowerCase() })
    .then((profileTypes) => {
      if (profileTypes.length === 0) return res.status(404).json({ msg: `Profile Type not found by name: ${text}` });
      return res.json({ profileTypes });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const add = (req, res) => {
  const newProfileType = new ProfileTypes({
    name: req.body.name,
    isActive: true,
  });
  newProfileType.save((err, profileType) => {
    if (err) return res.status(500).json({ msg: `Error: ${err}` });
    return res.json({ msg: 'New profile added: ', profileType });
  });
};

const edit = (req, res) => {
  const id = req.params;
  ProfileTypes.find(id, req.body, { new: true })
    .then((newProfileType) => {
      if (!newProfileType) return res.status(404).json({ msg: `No profile type founded on ID: ${id}` });
      return res.json({ msg: 'Profile type updated', newProfileType });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const id = req.params;
  ProfileTypes.findAndRemove(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `No profile type founded on ID: ${id}` });
      return res.json({ msg: 'Profile type removed', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  edit,
  remove,
};
