const http = require('http');
const htmlHandler = require('./htmlResponses');
const mediaHandler = require('./mediaResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const onRequest = (req, res) => {
  switch (req.url) {
    case '/':
      console.log(req.url);
      htmlHandler.getIndex(req, res);
      break;
    case '/party.mp4':
      console.log(req.url);
      mediaHandler.getParty(req, res);
      break;
    case '/bird.mp4':
      console.log(req.url);
      mediaHandler.getBird(req, res);
      break;
    case '/bling.mp3':
      console.log(req.url);
      mediaHandler.getBling(req, res);
      break;
    case '/page2':
      console.log(req.url);
      htmlHandler.getPage2(req, res);
      break;
    case '/page3':
      console.log(req.url);
      htmlHandler.getPage3(req, res);
      break;
    default:
      console.log(req.url);
      htmlHandler.getIndex(req, res);
      break;
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on localhost:${3000}`);
