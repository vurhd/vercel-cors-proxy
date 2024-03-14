const axios = require("axios");

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Allowed methods
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); // Allowed headers

  // Handle OPTIONS request (CORS preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const { url, headers, method, body } = req.body;

    const options = {
      method: method || "GET",
      url,
      headers,
      data: body,
      // timeout: 900000,
    };

    const response = await axios(options);

    res
      .status(response.status)
      .setHeader("Content-Type", response.headers["content-type"]);
    console.log(response.data);
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ type: "error", message: error.message });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
