const express = require('express');

const router = express.Router();
const applications = require('../controllers/applications');
const { validateFormat, isNotEmpty } = require('../validators/applications');

router.get('/', applications.getAll);
router.get('/search', validateFormat, applications.search);
router.get('/byCan/:id', validateFormat, applications.getByCandidate);
router.post('/', isNotEmpty, validateFormat, applications.add);
router.put('/:id', validateFormat, applications.edit);
router.delete('/:id', applications.remove);
router.get('/:id', validateFormat, applications.getById);
module.exports = router;
