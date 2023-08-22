const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const urlDatabase = {};

app.post('/shorten', (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();

  urlDatabase[shortUrl] = originalUrl;

  const shortenedUrl = `${req.protocol}://${req.get('host')}/${shortUrl}`;

  res.json({ shortUrl: shortenedUrl });
});

app.get('/:shortUrl', (req, res) => {
  const { shortUrl } = req.params;
  const originalUrl = urlDatabase[shortUrl];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('Short URL not found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
