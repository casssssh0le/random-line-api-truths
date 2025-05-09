const https = require('https');

module.exports = async function (req, res) {
  const fileUrl = "https://gist.githubusercontent.com/casssssh0le/7998657f8ffdb547ccc8cc8c0f20a9e6/raw/ffc4df12019cf694ae2e2f795b0377f8b30d60a5/truth";

  https.get(fileUrl, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const lines = data.split('\n').filter(line => line.trim() !== '');
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(randomLine);
    });

  }).on('error', (err) => {
    console.error('Error fetching file:', err);
    res.statusCode = 500;
    res.end('Failed to fetch data.');
  });
};
