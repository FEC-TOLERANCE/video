let mongoose = require('mongoose');
let data = require('./dataGeneration.js');


const db = mongoose.connect('mongodb://localhost/videoHeader', {useNewUrlParser: true, useUnifiedTopology: true})
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
  backing: {
    fundingGoal: Number,
    pledged: Number,
    backers: Number,
    daysRemaining: Number,
    fundingStatus: {
      plan: String,
      endDate: Date,
      alreadyFunded: String,
    }
  },
  header: {
    title: String,
    headline: String,
    videoUrl: String,
    thumbnail: String,
  }
};

console.log('data ', data.dataResults[0]);
const MyModel = mongoose.model('headerData', new Schema (headerSchema));
let SeedData = [];
for (let i = 0; i < data.length; i++) {
  seedData.push(new MyModel(data).save());
}

//iterate 100 times inputing data into an instance of mymodel
//promimse all to save all instances

// var seeds = listings.map((listing) => {
//     counter++;
//       listing.imageUrl = images[counter];
//         listing.address = addresses[counter];
//           listing.zipcode = zipcodes[zipcodeCounter()];
//             listing.houseId = counter;
//               return new Listings(listing).save();});
//               Promise.all(seeds)
//                 .then(() => {
//                       db.disconnect(()=> {
//                               console.log('Database Seeded');
//                                 });
//                                 });


