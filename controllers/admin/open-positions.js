const OpenPosition = require('../../models/OpenPosition');
const Candidates = require('../../models/Candidates');
const Applications = require('../../models/Applications');

const notFoundTxt = 'Open Position not found by';

const getAll = (req, res) => {
  OpenPosition.find()
    .populate('idCompany', 'name')
    .populate('idProfile', 'name')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const getById = (req, res) => {
  const { id } = req.params;
  OpenPosition.findById(id)
    .populate('idCompany', 'name')
    .populate('idProfile', 'name')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const search = (req, res) => {
  const queryParam = req.query;
  const idCompany = queryParam.company || null;
  if (!idCompany) return res.status(400).json({ msg: 'Missing query param: company', error: true });
  return OpenPosition.find({ idCompany })
    .then((data) => {
      if (data.length === 0) {
        return res
          .status(404)
          .json({ msg: `${notFoundTxt} Company ID: ${idCompany}`, error: true });
      }
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const add = async (req, res) => {
  const newOpenPosition = new OpenPosition({
    idCompany: req.body.idCompany,
    idProfile: req.body.idProfile,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    jobDescription: req.body.jobDescription,
  });
  newOpenPosition
    .save()
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
  const candidates = await Candidates.find({ profileTypes: req.body.idProfile, isActive: true });
  if (candidates.length !== 0) {
    candidates.forEach((candidate) => {
      const newApplication = new Applications({
        idOpenPosition: newOpenPosition._id,
        idCandidate: candidate._id,
        status: 'pending',
        isActive: true,
      });
      newApplication
        .save()
        .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
    });
    res.status(201).json({ msg: `Position created and ${candidates.length} application created`, newOpenPosition });
  } else {
    res.status(201).json({ msg: 'Position created but there is no applicants for this position', newOpenPosition });
  }
};

const edit = (req, res) => {
  const { id } = req.params;
  OpenPosition.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Position updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const remove = (req, res) => {
  const { id } = req.params;
  OpenPosition.findByIdAndRemove(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Position deleted', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

module.exports = {
  getAll,
  getById,
  search,
  add,
  edit,
  remove,
};
