const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

exports.handler = async (event, context) => {
  try {
    const records = await base('products').select({}).firstPage();

    const products = records.map(record => ({
      id: record.id,
      name: record.fields['Product Name'] || 'N/A',
      price: record.fields['Price'] || 'N/A',
      image: record.fields['Image URL'] || '',
      link: record.fields['Product Page'] || '#',
    }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.error('❌ Airtable fetch failed:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch products' }),
    };
  }
};
