const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // ✅ import upload middleware
const {
  createPeople,
  getAllPeople,
  getPeopleByID,
  updatePeople,
  updateStatus,
  deletePeople,
  searchPeople
} = require('../controllers/peopleController');

// CREATE People (with image)
router.post('/createPeople', upload.single('image'), createPeople);

// READ
router.get('/getAllPeople', getAllPeople);
router.get('/getPeopleByID/:id', getPeopleByID);

// UPDATE
router.put('/updatePeople/:id', updatePeople);
router.put('/updateStatus/:id', updateStatus);

// DELETE
router.delete('/deletePeople/:id', deletePeople);

// SEARCH
router.get('/search', searchPeople);

module.exports = router;
