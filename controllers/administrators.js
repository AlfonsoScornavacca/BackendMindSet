const fs = require('fs');
const path = require('path');
let adminData = require('../data/administrators.json');

const getLastId = group => {
    let large = 0;
    group.forEach(element => {
      if (element.id > large) {
        large = element.id;
      }
    });
    return large;
};

const validate = (entity) => {
    for (let key in entity) {
      if (entity[key] === undefined) {
        return false;
      }
    }
    return true;
};

const getAll = (req, res) => {
    res.json(adminData) 
};

const getById = (req, res) => {
    const foundId = adminData.find(administrator => administrator.id === parseInt(req.params.id));
    if (!foundId) {
        return res.status(404).json({ message: `No administrator with the id of ${req.params.id} founded` });
    }
    res.json(foundId);
};

const getByName = (req, res) => {
    const foundName = adminData.filter(administrator => administrator.firstName === (req.params.name));
    if (foundName.length <= 0) {
        return res.status(404).json({ message: `No administrator with the first name of ${req.params.name} founded` });
    }
    res.json(foundName);       
};

const add = (req, res) => {
    const newAdmin = {
        id: getLastId(adminData) +1,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        email: req.query.email,
        password: req.query.password,
        isActive: req.query.isActive,
    };
    if (!validate(newAdmin)) {
        return res.status(400).json({ message: 'Some parameters are missing' });
    }
    adminData.push(newAdmin)
        fs.writeFile(path.join(__dirname, '../data/administrators.json'), JSON.stringify(adminData), err => {
            if (err) { 
                res.status(500).json({ message: 'Error adding administrator' });
                return;
            }
            res.json({ message: 'Administrator successfully added', administrator: newAdmin });
        });
};

const edit = (req, res) => {
    const editAdmin = adminData.some(administrator => administrator.id === parseInt(req.params.id));
    if (editAdmin) {
        adminData = adminData.map(administrator => {
            if (administrator.id === parseInt(req.params.id)) {
                administrator.firstName = req.query.firstName || administrator.firstName;
                administrator.lastName = req.query.lastName || administrator.lastName;
                administrator.email = req.query.email || administrator.email;
                administrator.password = req.query.password || administrator.password;
                administrator.isActive = req.query.isActive || administrator.isActive;
                fs.writeFile('./data/administrators.json', JSON.stringify(adminData), (err) => {
                    if (err) {
                      res.status(500).json({ message: 'Error editing administrator' });
                    }
                });
                res.json({ message: 'Administrator updated', administrator });
            }
        })
    } else {
        res.status(404).json({ message: `No administrator with the id of ${req.params.id} founded` });
    }
};

const remove = (req, res) => {
    const foundIdDeleted = adminData.some(administrator => administrator.id === parseInt(req.params.id));
    if (foundIdDeleted) {
        adminData = adminData.filter((administrator) => administrator.id !== parseInt(req.params.id));
        fs.writeFile('./data/administrators.json', JSON.stringify(adminData), (err) => {
            if (err) {
              console.log(err);
              res.status(500).json({ message: 'Error removing administrator' });
            }
        });
        res.json({ message: 'Administrator removed' });
    }   else {
        res.status(404).json({ message: `No administrator with the id of ${req.params.id} founded` });
    }
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove
};

