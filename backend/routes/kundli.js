const express = require('express');
const { getBirthChart, getKundliChartData, getDashaData, getBirthDetails, getLocationData, getLocationSuggestions } = require('../controllers/kundli');

const kundliRouter = express.Router();


kundliRouter.post('/generate-kundli', getBirthChart);
kundliRouter.post('/kundli-data', getKundliChartData);
kundliRouter.post('/dasha-data', getDashaData);
kundliRouter.post('/birth-details', getBirthDetails);
kundliRouter.post('/location', getLocationData);
kundliRouter.get('/location-suggestions', getLocationSuggestions);







 


module.exports = kundliRouter;
