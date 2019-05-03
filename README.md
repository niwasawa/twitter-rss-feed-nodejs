# TwitterRSSFeed: Twitter RSS feed Node.js library

[![npm version](https://badge.fury.io/js/twitter-rss-feed.svg)](https://badge.fury.io/js/twitter-rss-feed)

twitter-rss-feed - npm https://www.npmjs.com/package/twitter-rss-feed

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

## Documentation

- GET statuses/user_timeline — Twitter Developers https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline
- Tweet updates — Twitter Developers https://developer.twitter.com/en/docs/tweets/tweet-updates.html
  - more than 140 characters, tweet_mode=extended, full_text

## Development

### Run testing

```
$ npm test
```

### Install local for testing

```
$ npm install LOCAL_REPOSITORY_PATH/twitter-rss-feed-nodejs/
```

### Release

```
$ rm package-lock.json
$ rm -r node_modules/
$ npm publish
```

```
$ git tag -a vX.X.X -m "YOUR TAGGING MESSAGE"
$ git push origin tags/vX.X.X
```

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

