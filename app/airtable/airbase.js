let Airtable = require('airtable');

Airtable.configure({
	apiKey: process.env.AIRTABLE_API_KEY
});

let responsesBase = 'appFXbapdPR9YrnOF';

global.AirBase = new Airtable().base(responsesBase);
