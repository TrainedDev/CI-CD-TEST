const express = require('express');
const {
  getPackages,
  getPackageByDest,
  addBooking,
  updatePackage,
  getbookingByPackage,
} = require('./controller/travelDetails');

const app = express();
app.use(express.json());

app.get('/packages', (req, res) => {
  try {
    const data = getPackages();
    if (!data) return res.status(404).json('No Packages Found');

    res.status(200).json({ msg: 'Packeges Successfully Found', data });
  } catch (error) {
    res.status(500).json({ msg: 'Something Went Wrong', Error: error.message });
  }
});

app.get('/packages/:destination', (req, res) => {
  try {
    const { destination } = req.params;
    if (!destination) return res.status(404).json('Required Details Not Found');
    const data = getPackageByDest(destination);

    res.status(200).json({ msg: 'Package Successfully Fetched', data });
  } catch (error) {
    res.status(500).json({ msg: 'Something Went Wrong', Error: error.message });
  }
});

app.post('/bookings', (req, res) => {
  try {
    if (!req.body) return res.status(404).json('Required Details Not Found');

    const data = addBooking(req.body);

    res.status(200).json({ msg: 'New Booking Successfully Created', data });
  } catch (error) {
    res.status(500).json({ msg: 'Something Went Wrong', Error: error.message });
  }
});

app.post('/packages/seats-update', (req, res) => {
  try {
    if (!req.body) return res.status(404).json('Required Details Not Found');
    const data = updatePackage(req.body);
    res.status(200).json({ msg: 'Package Successfully Updated', data });
  } catch (error) {
    res.status(500).json({ msg: 'Something Went Wrong', Error: error.message });
  }
});

app.get('/bookings/:packageId', (req, res) => {
  try {
    const packageId = parseInt(req.params.packageId);
    if (!packageId) return res.status(404).send('Required Details Not Found');
    const data = getbookingByPackage(packageId);
    res
      .status(200)
      .json({ msg: 'Booking Successfully Fetched By Package', data });
  } catch (error) {
    res.status(500).json({ msg: 'Something Went Wrong', Error: error.message });
  }
});

app.get('/', (req, res) => res.send('Server Is Live'));

module.exports = app;
