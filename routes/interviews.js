const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const interviews = require('../controllers/interviews');

const { validateFormat, isNotEmpty } = require('../validators/interviews');

router.get('/', authMiddleware, interviews.getAll);
router.get('/search', authMiddleware, validateFormat, interviews.search);
router.get('/:id', authMiddleware, validateFormat, interviews.getById);
router.post('/', authMiddleware, validateFormat, isNotEmpty, interviews.add);
router.put('/:id', authMiddleware, validateFormat, interviews.edit);
router.delete('/:id', authMiddleware, validateFormat, interviews.remove);

module.exports = router;
