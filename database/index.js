let mongoose = require('mongoose');
let database = require('./dataGeneration.js');

const db = mongoose.connect('mongodb://localhost/header', {useNewUrlParser: true, useUnifiedTopology: true})
  .catch(error => handleError(error));
const connection = mongoose.connection;
connection.on('error', () => {
  console.log('err creating mongoose connection');
});
connection.once('open', () => {
  console.log('im connected to mongo');
});
const { Schema } = mongoose;

let headerSchema = {
  identifier: Number,
  backing: {
    fundingGoal: Number,
    amountFunded: Number,
    newFundersPercent: Number,
    backers: Number,
    daysRemaining: Number,
    description: String,
    title: String,
    headline: String,
    fundingStatus: {
      plan: String,
      endDate: Date,
      alreadyFunded: String,
      title: String,
      headline: String
    }
  },
  header: {
    videoUrl: String,
    thumbnail: String,
  }
};

const HeaderModel = mongoose.model('headerData', new Schema (headerSchema));
let SeedData = [];

HeaderModel.find({})
  .then((requestData) => {
    if (requestData.length < 100) {
      for (let i = 0; i < 100; i++) {
        let generatedData = database.objectCreation(i);
        let currentModel = new HeaderModel(generatedData);
        SeedData.push(currentModel.save());
      }
    }
  })
  .then(() => {
    Promise.all(SeedData);
  })
  .catch((err) => {
    throw new Error(err);
  });

let getDbData = (id) => {
  return HeaderModel.find({identifier: id});
};

module.exports = {getDbData, HeaderModel};
