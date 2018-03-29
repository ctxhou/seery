const mongoose = require('mongoose');
const config = require('../../env/getConfig');

mongoose.connect(config.db);
