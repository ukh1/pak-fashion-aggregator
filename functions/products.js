// functions/products.js

export default async (req, context) => {
  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
  const BASE_ID = 'appGF7ABeJ9rOLpyM'; // Replace with your base ID
  const TABLE_NAME = 'Outfitters'; // Replace with your table name

  const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`
    }
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ error: 'Failed to fetch Airtable data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const data = await response.json();

  const products = data.records.map(record => ({
    id: record.id,
    ...record.fields
  }));

  return new Response(JSON.stringify(products), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
