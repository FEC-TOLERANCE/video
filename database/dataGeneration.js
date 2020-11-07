
const axios = require('axios');
const key = require('../config.js');

let randomUpTo = (num) => {
  let numStr = Math.floor(Math.random() * (num));
  let strNoCommas = '';
  return numStr;
};

let number = (length, decimals) => {
  let value = [];
  let afterDecimal = [];
  for (let i = 0; i < length; i++) {
    value.push(Math.floor(Math.random() * (9)));
  }
  for (let j = 0; j < decimals; j++) {
    afterDecimal.push(Math.floor(Math.random() * (9)));
  }
  afterDecimal = afterDecimal.join();
  value = value.join();
  return value;
};


let title = (length) => {
  let results = '';
  let titleList = 'The juxtaposition of images in the news of farmers destroying crops and dumping milk with empty supermarket shelves or hungry Americans lining up for hours at food banks tells a story of economic efficiency gone mad. Today the US actually has two separate food chains, each supplying roughly half of the market. The retail food chain links one set of farmers to grocery stores, and a second chain links a different set of farmers to institutional purchasers of food, such as restaurants, schools, and corporate offices. With the shutting down of much of the economy, as Americans stay home, this second food chain has essentially collapsed. But because of the way the industry has developed over the past several decades, it’s virtually impossible to reroute food normally sold in bulk to institutions to the retail outlets now clamoring for it. There’s still plenty of food coming from American farms, but no easy way to get it where it’s needed.';
  titleList = titleList.split(' ');
  for (let i = 0; i < length; i++) {
    results += titleList[(Math.floor(Math.random() * (titleList.length)))];
    results += ' ';
  }
  return results;
};

let city = (length) => {
  let results = '';
  let state = 'WA GA VA PA MN MI NY CA OR NV FL OK TX AZ AK HI'
  let city = 'Vancouver Phoenix Atlanta Minneapolis Athens London Portland Seattle Fargo Syracuse Rome Miami Orlando Birmingham Kennesaw Lawrence';
  cityList = city.split(' ');
  let stateList = state.split(' ');
  for (let i = 0; i < length; i++) {
    results += cityList[randomUpTo(15)] + ' ,';
    results += stateList[randomUpTo(15)];
  }
  return results;
};

let videoArray = [];

let video = () => {
  return axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      key: key.key,
      maxResults: 100,
      q: '',
      type: 'video',
      videoEmbeddable: 'true'
    }
  });
}

let objectCreation = (counter, videoArray) => {
  console.log('counter', counter);
  let videoUrl = videoArray[counter].id.videoId;
  let thumb = videoArray[counter].snippet.thumbnails.medium.url;
  let type = title(1);
  // let city = city();

  let generateData = () => {
    let randomizedData = {
      identifier: counter,
      location: 'New York, NY',
      itemType: type,
      snippet: {
        url: videoUrl,
        thumbnail: thumb,
      }
    };
    return randomizedData;
  };
  return generateData();
};

module.exports = {objectCreation, video}

