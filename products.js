// functions/products.js

export async function handler(event, context) {
  const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
  const BASE_ID = "appGF7ABeJ9rOLpyM";
  const TABLE_NAME = "Clothing";

  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}?view=Grid%20view`;

  try {
    const airtableRes = await fetch(url, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_TOKEN}`
      }
    });

    const data = await airtableRes.json();

    const products = data.records.map(record => ({
      id: record.id,
      Name: record.fields.Name || "Unnamed Product",
      Image: record.fields.Image?.[0]?.url || "",
      Price: record.fields.Price || "N/A",
      Category: record.fields.Category || "Uncategorised",
      Link: record.fields.Link || "#"
    }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    };
  } catch (err) {
    console.error('Airtable fetch failed:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' })
    };
  }
}
