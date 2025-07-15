// server/api/exchange.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Missing code' });
  }

  try {
    const githubRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await githubRes.json();

    if (data.error) {
      return res.status(400).json({ error: data.error_description });
    }

    return res.status(200).json({ accessToken: data.access_token });
  } catch (error) {
    console.error('Error exchanging code:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
