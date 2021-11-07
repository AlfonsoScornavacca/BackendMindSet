const fs = require('fs');
const openPositions = require('../data/open-positions.json');

const getAll = (req, res) => {
    if(openPositions.length > 0) {
        res.json(openPositions);
    } else {
        res.json({});
    }
};

const add = (req, res) => {
    const newOpenPosition = {
        id: openPositions.length + 1,
        idCompany: req.query.idCompany,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        jobDescription: req.query.jobDescription,
        isActive: req.query.isActive
    };
    if(!newOpenPosition.id || !newOpenPosition.idCompany || !newOpenPosition.startDate || !newOpenPosition.endDate || !newOpenPosition.jobDescription || !newOpenPosition.isActive) {
        res.send(400)
    }
    openPositions.push(newOpenPosition);
    fs.writeFile('./data/open-positions.json', JSON.stringify(openPositions), err => {
        if (err) {
            res.send(500, 'Error trying to save new data');
        }
    });
    res.json(newOpenPosition);
};

const getById = (req, res) => {
    const id = parseInt(req.query.id);
    const openPosition = openPositions.find((openPosition) => openPosition.id === id);
    if (openPosition) {
      res.json(openPosition);
    } else {
      res.status(404).json({ message: `Open position not found with id: ${id}` });
    }
};

const getByIdCompany = (req, res) => {
    const idCompany = parseInt(req.query.idCompany);
    const openPositions = openPositions.find((openPosition) => openPosition.idCompany === idCompany);
    if (openPositions) {
      res.json(openPositions);
    } else {
      res.status(404).json({ message: `Open positions not found for company id: ${idCompany}` });
    }
};

const edit = (req, res) => {
    let openPosition = openPositions.find(openPositions => openPositions.id === parseInt(req.query.id));
    if (openPosition) {
        console.log(req.query)
        openPosition.idCompany = req.query.idCompany ? req.query.idCompany : openPosition.idCompany;
        openPosition.startDate = req.query.startDate ? req.query.startDate : openPosition.startDate;
        openPosition.endDate = req.query.endDate ? req.query.endDate : openPosition.endDate;
        openPosition.jobDescription = req.query.jobDescription ? req.query.jobDescription : openPosition.jobDescription;
        openPosition.isActive = req.query.isActive ? req.query.isActive : openPosition.isActive;
        fs.writeFile('./data/open-positions.json', JSON.stringify(openPositions), (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Error trying to edit the open position' });
            }
        });
        res.json({ message: 'Success! Position edited', openPosition });
    } else {
        res.status(404).json({ message: `The open position wasn't found with id: ${req.query.id}` });
    }
};

const remove = (req, res) => {
    // your code here
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByIdCompany: getByIdCompany,
  add: add,
  edit: edit,
  remove: remove
};