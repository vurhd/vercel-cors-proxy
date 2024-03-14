const axios = require('axios');

export default async function handler(req, res) {
  try {
    const { url, headers, method, body } = req.body;

    const options = {
      method: method || 'GET',
      url,
      headers,
      data: body,
    };

    const response = await axios(options);

    res.status(response.status);
    res.setHeader('Content-Type', response.headers['content-type']);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ type: 'error', message: error.message });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};