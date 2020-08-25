const fs = require('fs');
const path = require('path');

const getRange = (req, res, total) => {
  let { range } = req.headers;
  if (!range) {
    range = 'bytes=0-';
  }
  const positions = range.replace(/bytes=/, '').split('-');
  let startPos = parseInt(positions[0], 10);

  const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
  if (startPos > end) {
    startPos = end - 1;
  }
  const chunksize = (end - startPos) + 1;
  return [startPos, end, chunksize];
};

const openStream = (req, res, start, end, file) => {
  const stream = fs.createReadStream(file, { start, end });
  stream.on('open', () => {
    stream.pipe(res);
  });

  stream.on('error', (streamErr) => {
    res.end(streamErr);
  });
};

const loadFile = (req, res, file, contentType) => {
  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
      }
      return res.end(err);
    }
    const total = stats.size;
    const range = getRange(req, res, total);
    const start = range[0];
    const end = range[1];
    const chunksize = range[2];
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
    });
    const stream = openStream(req, res, start, end, file);
    return stream;
  });
};
const getParty = (req, res) => {
  const file = path.resolve(__dirname, '../client/party.mp4');
  loadFile(req, res, file, 'video/mp4');
};
const getBling = (req, res) => {
  const file = path.resolve(__dirname, '../client/bling.mp3');
  loadFile(req, res, file, 'audio/mpeg');
};
const getBird = (req, res) => {
  const file = path.resolve(__dirname, '../client/bird.mp4');
  loadFile(req, res, file, 'video/mp4');
};
module.exports = { getParty, getBling, getBird };
