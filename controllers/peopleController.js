const People = require('../models/People');

// CREATE People
async function createPeople(req, res) {
  try {
    const { peopleName, peopleEmail, peoplePhone, peopleDOB, peopleAddress } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!peopleName || !peopleEmail) {
      return res.status(400).send({ msg: 'Name and Email are required', success: false });
    }

    const newPeople = new People({
      peopleName,
      peopleEmail,
      peoplePhone,
      peopleDOB,
      peopleAddress,
      image
    });

    await newPeople.save();
    res.status(201).send({ msg: 'People created successfully', success: true, people: newPeople });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Database error', success: false });
  }
}


// -------------------- GET All Active People --------------------
async function getAllPeople(req, res) {
  try {
    const people = await People.find({ isActive: true });
    res.status(200).send({ people, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Database error', success: false });
  }
}

// -------------------- GET People by ID --------------------
async function getPeopleByID(req, res) {
  try {
    const id = req.params.id;
    const people = await People.findOne({ _id: id, isActive: true });
    if (!people) return res.status(404).send({ msg: 'People not found', success: false });
    res.status(200).send({ people, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Database error', success: false });
  }
}

// -------------------- UPDATE People Details --------------------
async function updatePeople(req, res) {
  try {
    const id = req.params.id;
    const updates = req.body;

    const people = await People.findOneAndUpdate({ _id: id, isActive: true }, updates, { new: true });
    if (!people) return res.status(404).send({ msg: 'People not found or inactive', success: false });

    res.status(200).send({ msg: 'People details updated successfully', success: true, people });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Database error', success: false });
  }
}

// -------------------- UPDATE Status (Active/Inactive) --------------------
async function updateStatus(req, res) {
  try {
    const id = req.params.id;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).send({ msg: "Invalid 'isActive'. Use true/false.", success: false });
    }

    const updated = await People.findByIdAndUpdate(id, { isActive }, { new: true });
    if (!updated) return res.status(404).send({ msg: 'People not found', success: false });

    res.status(200).send({
      msg: `People status updated successfully to ${isActive ? 'Active' : 'Inactive'}`,
      success: true,
      people: updated
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Database error', success: false });
  }
}

// -------------------- DELETE People --------------------
async function deletePeople(req, res) {
  try {
    const id = req.params.id;
    const deleted = await People.findByIdAndDelete(id);
    if (!deleted) return res.status(404).send({ msg: 'People not found', success: false });

    res.status(200).send({ msg: 'People deleted successfully', success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Database error', success: false });
  }
}

// -------------------- SEARCH People (Active Only) --------------------
async function searchPeople(req, res) {
  try {
    const { name, email } = req.query;
    if (!name && !email) return res.status(400).send({ msg: 'Provide name or email', success: false });

    const query = { isActive: true };
    if (name) query.peopleName = { $regex: name, $options: 'i' };
    if (email) query.peopleEmail = { $regex: email, $options: 'i' };

    const people = await People.find(query);
    res.status(200).send({ people, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Database error', success: false });
  }
}

// -------------------- EXPORT --------------------
module.exports = {
  createPeople,
  getAllPeople,
  getPeopleByID,
  updatePeople,
  updateStatus,
  deletePeople,
  searchPeople
};
