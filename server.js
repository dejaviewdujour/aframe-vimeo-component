const Vimeo = require('vimeo').Vimeo;
const express = require('express');
const app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

app.use(express.static('assets'));
app.use(express.static('../vimeo-webgl-player/dist')); // tmp
app.use(express.static('dist'));
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});

app.get('/vimeo/api', (request, response) => {
  let api = new Vimeo(null, null, process.env.VIMEO_TOKEN);

  api.request({
      method: 'GET',
      path: request.query.path,
      headers: { Accept: 'application/vnd.vimeo.*+json;version=3.4' },
    },
    function(error, body, status_code, headers) {
      if (error) {
        response.status(500).send(error);
        console.log('[Server] ' + error);
      } else {
        // Pass through the whole JSON response
        response.status(200).send(body);
      }
    }
  );
});

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}. 🚢`);
});
