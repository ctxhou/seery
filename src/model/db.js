const mongoose = require('mongoose');
const config = require('../../env/config');

mongoose.connect(config.db);
