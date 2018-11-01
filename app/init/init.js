//Load enviroment variable into node process.env. See any *.env files on root dir.
require('../init/dotenv.js');

//Init airtable base
require('../airtable/airbase.js');

//Load all Mongoose
//require('../mongoose/mongoose.js');

require('../util/util.js');
require('../util/log.js');

require('../airtable/config.js').load();
