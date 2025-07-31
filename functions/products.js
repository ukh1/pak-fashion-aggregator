const Airtable = require('airtable');

exports.handler = async function () {
  const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

  try {
    const records = await base('products').select({}).firstPage();
    const products = records.map(record => ({
      id: record.id,
      ...record.fields,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
