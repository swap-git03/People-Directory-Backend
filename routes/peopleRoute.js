const express = require('express')
const peopleController = require('../controllers/peopleController')

const router = express.Router()


router.post('/createPeople', peopleController.createPeople)
router.get('/getAllPeople', peopleController.getAllPeople)
// router.get('/getTaskByID/:ID',taskController.getTaskByID)
// router.put('/isComplete/:ID', taskController.updateIsComplete)
// router.delete('/deleteTask/:ID', taskController.deleteTask)
// router.put('/updateTask/:ID', taskController.updateTask)
module.exports = router;