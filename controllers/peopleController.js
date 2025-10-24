const db = require("../config/db");

// Create a new person
function createPeople(req, res) {
  const { peopleName, peopleEmail, peoplePhone, peopleDOB, peopleAddress } = req.body;

  try {
    // basic validation
    if (!peopleName || !peopleEmail) {
      return res.status(400).send({ msg: "Name and Email are required", success: false });
    }

    const q1 = `INSERT INTO lok (peopleName, peopleEmail, peoplePhone, peopleDOB, peopleAddress)
                VALUES (?, ?, ?, ?, ?)`;

    db.query(q1, [peopleName, peopleEmail, peoplePhone, peopleDOB, peopleAddress], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ msg: "Database error", success: false });
      }

      res.status(200).send({ msg: "Person added successfully", success: true });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", success: false });
  }
}

// Get all people
function getAllPeople(req, res) {
  try {
    const q2 = "SELECT * FROM lok";

    db.query(q2, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ msg: "Database error", success: false });
      }

      res.status(200).send({ people: result, success: true });
    });
  } catch (error) {
    res.status(500).send({ msg: "Server error", success: false });
  }
}

module.exports = {
  createPeople,
  getAllPeople,
};
