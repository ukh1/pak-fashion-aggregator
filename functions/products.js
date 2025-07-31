export default async (req, res) => {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = 'Products';

  const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
  const options = {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    const records = data.records.map(record => record.fields);

    // 🛑 Filter out records like "meta-title", "meta-description"
    const filtered = records.filter(
      r => r.Name && !r.Name.toLowerCase().startsWith('meta-')
    );

    res.status(200).json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
