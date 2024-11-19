// utils/documentHelpers.js
const fs = require('fs');
const path = require('path');

async function getUltimoIdAlbaran() {
  // Logic to get the last albaran number
  // For demonstration, we'll return a random number, but in production,
  // retrieve the latest albaran number from a database or file.
  return Math.floor(Math.random() * 1000); // Replace with actual logic
}

function getDate() {
  const date = new Date();
  const day = date.getDate();
  const monthNames = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return [day, month, year];
}

module.exports = {
  getUltimoIdAlbaran,
  getDate
};
