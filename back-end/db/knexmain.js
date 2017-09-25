var environment = process.env.NODE_ENV || 'production';
var config = require('../knexfilemain.js')[environment];
module.exports = require('knex')(config);
