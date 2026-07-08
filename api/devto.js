export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const token = process.env.DEVTO_TOKEN;
  if (!token) return res.status(500).json({ error: 'DEVTO_TOKEN not set' });

  const r = await fetch('https://dev.to/api/articles', {
    method: 'POST',
    headers: { 'api-key': token, 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body),
  });

  const data = await r.json();
  res.status(r.status).json(data);
}
