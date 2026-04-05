export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const { code } = req.query
  if (!code) return res.status(400).json({ error: '缺少code' })
  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    })
    const data = await response.json()
    if (data.error) return res.status(400).json({ error: data.error_description })
    return res.json({ token: data.access_token })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}
