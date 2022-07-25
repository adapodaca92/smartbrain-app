const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'd7ac7697391d4ba1ad816545c37841b3',
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json('Unable to work with the API.'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => {
      res.status(400).json('Error getting entries');
    });
};

module.exports = {
  handleImage,
  handleApiCall,
};
