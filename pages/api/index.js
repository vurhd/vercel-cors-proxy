const axios = require('axios');
const querystring = require('querystring');

export default async function handler(req, res) {
  try {
    const { url, method, body, headers: encodedHeaders } = req.query;

    const headers = querystring.parse(encodedHeaders, ';', '=');

    const options = {
      method: method || 'GET',
      url,
      headers,
      data: body ? JSON.parse(body) : undefined,
    };

    const response = await axios(options);

    res.status(response.status);
    res.setHeader('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ type: 'error', message: error.message });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};