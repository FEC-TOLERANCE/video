let mongoose = require('mongoose');
let database = require('./dataGeneration.js');

const db = mongoose.connect('mongodb://localhost/video', {useNewUrlParser: true, useUnifiedTopology: true})
  .catch(error => handleError(error));
const connection = mongoose.connection;
connection.on('error', () => {
  console.log('err creating mongoose connection');
});
connection.once('open', () => {
  console.log('im connected to mongo');
});
const { Schema } = mongoose;

let videoSchema = {
  identifier: Number,
  location: String,
  itemType: String,
  snippet: {
    url: String,
    thumbnail: String,
  }
};

const VideoModel = mongoose.model('videoData', new Schema (videoSchema));
let SeedData = [];

VideoModel.find({})
  .then((requestData) => {
    if (requestData.length < 100) {
      let youtubeData = [];
      database.video()
        .then((data) => {
          // console.log('youtube data', data.data.items);
          for (let i = 0; i < 2; i++) {
            for (let j = 0; j < data.data.items.length; j++) {
              youtubeData.push(data.data.items[j]);
            }
          }
          youtubeData.push(data.data.items);
          youtubeData.push(data.data.items);
          console.log(youtubeData.length);
          for (let i = 0; i < 100; i++) {
            let generatedData = database.objectCreation(i, youtubeData);
            let currentModel = new VideoModel(generatedData);
            SeedData.push(currentModel.save());
          }
        })
        .catch((err) => {
          console.log('err seeding video', err);
        })
    }
  })
  .then(() => {
    Promise.all(SeedData);
  })
  .catch((err) => {
    throw new Error(err);
  });

let getDbData = (id) => {
  return VideoModel.find({identifier: id});
};

module.exports = {getDbData, VideoModel};
