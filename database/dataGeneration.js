
const axios = require('axios');
// const key = require('../config.js');

let randomUpTo = (num) => {
  let numStr = Math.floor(Math.random() * (num));
  let strNoCommas = '';
  return numStr;
};


let date = (future) => {
  if (future) {
    let month = Math.floor(Math.random() * (12));
    let day = Math.floor(Math.random() * (31));
    let year = '202' + Math.floor(Math.random() * (8) + 1);
    return month + '.' + day + '.' + year;
  } else {
    let month = Math.floor(Math.random() * (12));
    let day = Math.floor(Math.random() * (31));
    let year = '201' + Math.floor(Math.random() * (9));
    return month + '.' + day + '.' + year;
  }
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

let names = (count) => {
  let results = [];
  for (let i = 0; i < count; i++) {
    let name = '';
    name += (firstNameList[(Math.floor(Math.random() * (firstNameList.length)))]);
    name += ' ';
    name += (lastNameList[(Math.floor(Math.random() * (lastNameList.length)))]);
    results.push(name);
  }
  return results.join();
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

let description = (length) => {
  let results = '';
  let descriptionList = 'The juxtaposition of images in the news of farmers destroying crops and dumping milk with empty supermarket shelves or hungry Americans lining up for hours at food banks tells a story of economic efficiency gone mad. Today the US actually has two separate food chains, each supplying roughly half of the market. The retail food chain links one set of farmers to grocery stores, and a second chain links a different set of farmers to institutional purchasers of food, such as restaurants, schools, and corporate offices. With the shutting down of much of the economy, as Americans stay home, this second food chain has essentially collapsed. But because of the way the industry has developed over the past several decades, it’s virtually impossible to reroute food normally sold in bulk to institutions to the retail outlets now clamoring for it. There’s still plenty of food coming from American farms, but no easy way to get it where it’s needed.';
  descriptionList = descriptionList.split(' ');
  for (let i = 0; i < length; i++) {
    if ((Math.floor(Math.random() * (15))) === 5) {
      results += '.';
    } else if ((Math.floor(Math.random() * (25))) === 5) {
      results += ',';
    } else if ((Math.floor(Math.random() * (40))) === 5) {
      results += '?';
    } else if ((Math.floor(Math.random() * (200))) === 5) {
      results += '/n';
    } else if (results[i - 4] === '/' && results[i - 3] ==='n') {
      results += '   ' + descriptionList[(Math.floor(Math.random() * (descriptionList.length)))].toUpperCase();
    } else if (results[i - 1] === '.' || results[i - 1] === '?') {
      results += ' ' + descriptionList[(Math.floor(Math.random() * (descriptionList.length)))].toUpperCase();
    } else {
      results += ' ' + descriptionList[(Math.floor(Math.random() * (descriptionList.length)))].toLowerCase();
    }
  }
  if (results[results.length - 1] === ',') {
    results += descriptionList[(Math.floor(Math.random() * (descriptionList.length)))].toLowerCase() + '.';
  } else if (results[results.length - 1] === '.' || results[results.length - 1] === '?') {
    return results;
  } else {
    return results + '.';
  }
};

let videoArray = [];

let video = () => {
  return axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      key: key.key,
      maxResults: 100,
      q: 'dogs',
    }
      .then((data) => {
        videoArray = data;
      })
      .catch((err) => {
        throw new Error(err);
      })
  });
};
video()
  .then(() => {

  })

let objectCreation = (counter) => {
  let fundingGoal = randomUpTo(100000);
  let pledged = randomUpTo(100000);
  let backers = randomUpTo(50000);
  let days = randomUpTo(200);
  let headline = description(randomUpTo(40));
  let header = title(randomUpTo(7));
  let paragraph = description(randomUpTo(500));
  let endDate = date(true);
  let percentNew = randomUpTo(100) / 100;

  let generateData = () => {
    let randomizedData = {
      identifier: counter,
      backing: {
        fundingGoal: fundingGoal,
        amountFunded: pledged,
        newFundersPercent: percentNew,
        backers: backers,
        description: paragraph,
        daysRemaining: days,
        endDate: endDate,
        title: header,
        headline: paragraph
      },
      header: {
        videoUrl: videoArray,
        thumbnail: 'thumbnail'
      }
    };
    return randomizedData;
  };
  return generateData();
};

module.exports = {objectCreation, video};
