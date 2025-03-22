// services/crisisDetector.js
const axios = require('axios');

async function isCrisisMessage(text) {
  try {
    // Replace with the correct URL if deployed differently
    const response = await axios.post('http://localhost:8000/predict', { text });
    // Assuming response.data.label is 1 for crisis, 0 for not crisis
    return response.data.label === 1;
  } catch (error) {
    console.error("Error in crisis detection:", error.response ? error.response.data : error.message);
    // Fallback: if error, return false (or handle differently)
    return false;
  }
}

module.exports = { isCrisisMessage };
