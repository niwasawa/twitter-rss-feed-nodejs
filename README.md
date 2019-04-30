# TwitterRSSFeed: Twitter RSS feed Node.js library

This library is under development and unstable.

## Installation

```
$ npm install twitter-rss-feed
```

## Usage

### Create a instance of TwitterRSSFeed

```node.js
const TwitterRSSFeed = require('twitter-rss-feed');

const trf = new TwitterRSSFeed({
  consumer_key: 'YOUR_CONSUMER_KEY',
  consumer_secret: 'YOUR_CONSUMER_SECRET',
  token: 'YOUR_ACCESS_TOKEN',
  token_secret: 'YOUR_ACCESS_SECRET'
});
```

### Use user_timeline method

```node.js
// parameters for Twitter API (GET statuses/user_timeline)
const params = {
  'screen_name' : 'YOUR_SCREEN_NAME',
  'count' : '20',
  'tweet_mode' : 'extended'
};

// information of RSS feed
const info = {
  'channel' : {
    'title' : 'Your RSS feed title',
    'description' : 'Your RSS feed title',
    'link' : 'https://twitter.com/YOUR_SCREEN_NAME'
  }
};

// reservated parameters for future
const opts = {};

// callback function
const callback = function(error, rss) {
  if (error) {
    console.log(error);
  } else {
    console.log(rss);
  }
};

// create RSS feed
trf.user_timeline(params, info, opts, callback);
```

### Use promise object

```nodejs
// Do not specify a callback function
const promise = trf.user_timeline({
  'screen_name' : 'YOUR_SCREEN_NAME',
  'count' : '20',
  'tweet_mode' : 'extended'
}, {
  'channel' : {
    'title' : 'Your RSS feed title',
    'description' : 'Your RSS feed title',
    'link' : 'https://twitter.com/YOUR_SCREEN_NAME'
  },
});

promise
.then(function(rss) {
  console.log(rss);
})
.catch(function(error) {
  console.log(error);
});
```

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

