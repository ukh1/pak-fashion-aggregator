const Airtable = require('airtable');

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

exports.handler = async (event, context) => {
  try {
    const records = await base('products').select({}).firstPage();

    const products = records.map(record => {
  const fields = record.fields;
  return {
    id: record.id,
    name: fields["Product Name"] || '',
    price: fields["Price"] || 0,
    image: fields["Image URL"]?.[0]?.url || '',
    link: fields["Product Page"] || '',
  };
});

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
