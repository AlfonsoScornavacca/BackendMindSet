const fs = require('fs');
const path = require('path');
let profileTypes = require('../data/profile-types.json');

const getLastID = (collection) => {
  let larger = 0;
  collection.forEach((element) => {
    if (element.id > larger) {
    larger = element.id;
    }
  });
  return larger;
};

const validate = (object) => {
  for (let key in object) {
      if (object[key] === undefined) {
          return false;
      }
  }
  return true;
};

const getAll = (req, res) => {
  res.json(profileTypes);
};

const getById = (req, res) => {
    const profileTypesId  = profileTypes.find((profileTypesId) => profileTypesId.id === parseInt(req.params.id));
    if (!profileTypesId) {
      res.status(404).json({ message: `Profile not found with id: ${parseInt(req.params.id)}` });
    }
    res.json(profileTypesId);
};

const getByName = (req, res) => {
  const profileTypesName  = profileTypes.filter((profileTypesName) => profileTypesName.name === (req.params.name));
  if (!profileTypesName) {
    res.status(404).json({ message: `Profile not found with name: ${(req.params.name)}` });      
  }
  res.json(profileTypesName); 
};

const add = (req, res) => {
  const newProfile = { 
    id: getLastID(profileTypes) + 1,
    name: req.query.name,
    isActive: req.query.isActive
  };
    if(!validate(newProfile)) {
      return res.status(400).json({ message: 'Missing parameters' })
    };
      profileTypes.push(newProfile);
      fs.writeFile(path.join(__dirname, './data/profile-types.json'), JSON.stringify(profileTypes), err => {
      if(err) {
        console.log(err);
        res.status(500).json({ message: 'Error adding profile' })
      };
        return;
      })
  res.json(newProfile);
};

const edit = (req, res) => {    
  const searchProfile = profileTypes.find((profile) => profile.id === parseInt(req.params.id));
  if (!searchProfile) {
    return res.status(404).json({ message: `Profile not found with id ${id}` });
    }
    profileTypes.map((profile) => {
      if(profile.id === parseInt(req.params.id)) {
        profile.name = req.query.name || profile.name;
        profile.isActive = req.query.name || profile.isActive;
      }
      return profile;
    });
  fs.writeFile(path.join(__dirname, './data/profile-types.json'), JSON.stringify(profileTypes), err => {
    if(err) {
      console.log(err);
      res.status(500).json({ message: 'Error editing profile' });
      return;
    }
    res.json({ message: 'Company edited successfully', companyFound });
  });
};

const remove = (req, res) => {
  const searchProfile = profileTypes.find((profile) => profile.id === parseInt(req.params.id));
  const profileRemove = profileTypes.filter((profile)=> profile.id !== parseInt(req.params.id));
  fs.writeFile(path.join(__dirname, './data/profile-types.json'), JSON.stringify(profileRemove), err => {
    if(err) {
      console.log(err);
      res.status(500).json({ message: 'Error deleting profile' });
    }
  })
  if(!searchProfile) {
    res.status(400).json({ message:`Profile not found with id ${req.params.id}` });
  }
  res.json({ message: 'Profile deleted' });
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove
};