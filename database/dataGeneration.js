let axios = require('axios');
var randomUpTo = (num) => {
  let numStr = Math.floor(Math.random() * Math.floor(num));
  let strNoCommas = '';
  // console.log('numStr', numStr);
  // for (let i = 0; i < numStr.length; i++) {
  //   if (numStr[i] !== ',') {
  //     strNoCommas += numStr[i];
  //   }
  // }
  // let number = strNoCommas;
  // console.log('number', number);
  return numStr;
};
let key = require('../config.js');

var date = (future) => {
  if (future) {
    var month = Math.floor(Math.random() * Math.floor(12));
    var day = Math.floor(Math.random() * Math.floor(31));
    var year = '202' + Math.floor(Math.random() * Math.floor(8) + 1);
    return month + '.' + day + '.' + year;
  } else {
    var month = Math.floor(Math.random() * Math.floor(12));
    var day = Math.floor(Math.random() * Math.floor(31));
    var year = '201' + Math.floor(Math.random() * Math.floor(9));
    return month + '.' + day + '.' + year;
  }
};

var number = (length, decimals) => {
  var value = [];
  var afterDecimal = [];
  for (var i = 0; i < length; i++) {
    value.push(Math.floor(Math.random() * Math.floor(9)));
  }
  for (var j = 0; j < decimals; j++) {
    afterDecimal.push(Math.floor(Math.random() * Math.floor(9)));
  }
  afterDecimal = afterDecimal.join();
  value = value.join();
  return value;
};

var names = (count) => {
  //need to input first name and last name list
  var results = [];
  for (var i = 0; i < count; i++) {
    var name = '';
    name += (firstNameList[(Math.floor(Math.random() * Math.floor(firstNameList.length)))]);
    name += ' ';
    name += (lastNameList[(Math.floor(Math.random() * Math.floor(lastNameList.length)))])
    results.push(name);
  }
  return results.join();
};

var title = (length) => {
  var results = '';
  var titleList = ['here', 'is', 'a', 'list', 'of', 'titles'];
  for (var i = 0; i < length; i++) {
    results += titleList[(Math.floor(Math.random() * Math.floor(titleList.length)))]
    results += ' ';
  }
  return results;
};

var description = (length) => {
  var results = '';
  var descriptionList = ['this', 'is', 'random', 'words'];
  for (var i = 0; i < length; i++) {
    if ((Math.floor(Math.random() * Math.floor(15))) === 5) {
      results += '.';
    } else if ((Math.floor(Math.random() * Math.floor(25))) === 5) {
      results += ',';
    } else if ((Math.floor(Math.random() * Math.floor(40))) === 5) {
      results += '?';
    } else if ((Math.floor(Math.random() * Math.floor(200))) === 5) {
      results += '/n';
    } else if (results[i - 4] === '/' && results[i - 3] ==='n') {
      results += '   ' + descriptionList[(Math.floor(Math.random() * Math.floor(descriptionList.length)))].toUpperCase();
    } else if (results[i - 1] === '.' || results[i - 1] === '?') {
      results += ' ' + descriptionList[(Math.floor(Math.random() * Math.floor(descriptionList.length)))].toUpperCase();
    } else {
      results += ' ' + descriptionList[(Math.floor(Math.random() * Math.floor(descriptionList.length)))].toLowerCase();
    }
  }
  if (results[results.length - 1] === ',') {
    results += descriptionList[(Math.floor(Math.random() * Math.floor(descriptionList.length)))].toLowerCase() + '.';
  } else if (results[results.length - 1] === '.' || results[results.length - 1] === '?') {
    return results;
  } else {
    return results + '.';
  }
};

let videoArray = [];

var video = (count) => {
  //query youtube with random search term
  axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      key: key.key,
      maxResults: 100,
      q: 'dogs',
    }
  })
    .then((videoData) => {
      // console.log('videoData', videoData.data);
    })
    .catch((err) => {
      console.log('err', err);
    });
};

// var image = (count) => {
//   //query sploosh for image based on random word
// };

var currency = () => {
  var currencyOptions = ['USD', 'EUR', 'AUD', 'GBP', 'JPY', 'CHF', 'AFN', 'ALL'];
  return currencyOptions[(Math.floor(Math.random() * Math.floor(currencyOptions.length)))];
};

let counter = 0;
var objectCreation = () => {
  // var fundingGoal = number(4 + randomUpTo(5), 0);
  var fundingGoal = randomUpTo(100000)
  var pledged = randomUpTo(100000);
  // if (randomUpTo(5) === 4) {
  //   pledged = randomUpTo(10) * fundingGoal;
  // } else {
  //   pledged = Math.random() * fundingGoal;
  // }
  var backers = randomUpTo(50000);
  var days = randomUpTo(200);
  var headline = description(randomUpTo(40));
  var header = title(randomUpTo(7));
  var paragraph = description(randomUpTo(500));
  var endDate = date(true);

  let generateData = () => {
    video();
    counter++;
    var randomizedData = {
      id: counter,
      backing: {
        fundingGoal: fundingGoal,
        pledged: pledged,
        backers: backers,
        description: paragraph,
        daysRemaining: days,
        endDate: endDate,
      },
      header: {
        title: header,
        videoData: videoArray[counter],
      }
    };
    return randomizedData;
  };
  return generateData();
};
let dataResults = [];
for (let i = 0; i < 3; i++) {
  dataResults.push(objectCreation());
}

module.exports.dataResults = dataResults;