const https = require('https');

module.exports = async function (req, res) {
  const fileUrl = "https://gist.githubusercontent.com/casssssh0le/232a1529a030ad79fd09319f308790f7/raw/4af18f9552bbc9c9a78be13e8d0185c76c00cfac/gistfile1.txt";

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
