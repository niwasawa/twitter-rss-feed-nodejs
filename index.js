'use strict';

const Twitter = require('twitter');
const Feed = require('feed').Feed;

/*
 * PublicUsersFilter class.
 */
class PublicUsersFilter {
  filter(tweets) {
    return tweets.filter(tweet => !tweet.user.protected);
  }
}

/**
 * TwitterRSSFeed class.
 */
class TwitterRSSFeed {

  /**
   * Twitter credentials.
   * @typedef {Object} Credentials
   * @property {string} consumer_key - Consumer key
   * @property {string} consumer_secret - Consumer secret
   * @property {string} token - Access token
   * @property {string} token_secret - Access secret
   */

  /**
   * Creates a instance of TwitterRSSFeed.
   * @param {Credentials} credentials - Twitter credentials
   * @constructor
   */
  constructor(credentials) {
    this.t = new Twitter({
      consumer_key: credentials.consumer_key,
      consumer_secret: credentials.consumer_secret,
      access_token_key: credentials.token,
      access_token_secret: credentials.token_secret 
    });
  }

  /**
   * Returns a RSS feed of Twitter API (GET statuses/user_timeline).
   * @param {Object} params - Parameters of Twitter API (GET statuses/user_timeline).
   * @param {Object} info - A RSS information.
   * @param {Object} opts - Unimplemented.
   * @returns {Promise<string>} A RSS feed.
   * @see {@link https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline|GET statuses/user_timeline — Twitter Developers}
   */
  async statuses_user_timeline(params, info, opts = {}) {
    const tweets = await this.t.get('statuses/user_timeline', params);
    const filtered_tweets = this._filter_tweets(tweets, opts.filters);
    const rss = this._make_rss(info, filtered_tweets);
    return rss;
  }

  /**
   * Returns a RSS feed of Twitter API (GET favorites/list).
   * @param {Object} params - Parameters of Twitter API (GET favorites/list).
   * @param {Object} info - A RSS information.
   * @param {Object} opts - Unimplemented.
   * @returns {Promise<string>} A RSS feed.
   * @see {@link https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list|GET favorites/list — Twitter Developers}
   */
  async favorites_list(params, info, opts = {}) {
    const tweets = await this.t.get('favorites/list', params);
    const filtered_tweets = this._filter_tweets(tweets, opts.filters);
    const rss = this._make_rss(info, filtered_tweets);
    return rss;
  }

  /**
   * Returns a RSS feed of Twitter API (Standard search API).
   * @param {Object} params - Parameters of Twitter API (Standard search API).
   * @param {Object} info - A RSS information.
   * @param {Object} opts - Unimplemented.
   * @returns {Promise<string>} A RSS feed.
   * @see {@link https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets|Standard search API — Twitter Developers}
   */
  async search_tweets(params, info, opts = {}) {
    const searched = await this.t.get('search/tweets', params);
    const tweets = searched.statuses;
    const filtered_tweets = this._filter_tweets(tweets, opts.filters);
    const rss = this._make_rss(info, filtered_tweets);
    return rss;
  }
 
  _make_rss(info, tweets) {

    const feed = new Feed({
      title: info.channel.title,
      description: info.channel.description,
      link: info.channel.link
    });

    tweets.forEach(tweet => {
      const text = this._get_text(tweet);
      const url = 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str;
      feed.addItem({
        title: tweet.user.name + ' on Twitter: "' + text + '" / Twitter',
        description: text,
        link: url,
        date: new Date(tweet.created_at)
      });
    });

    return feed.rss2();
  }

  _get_text(tweet) {
    // Use full_text for more than 140 characters.
    //
    // ref. Tweet updates — Twitter Developers
    // https://developer.twitter.com/en/docs/tweets/tweet-updates.html
    if (tweet.retweeted_status) {
      let text;
      if (tweet.retweeted_status.full_text) {
        text = tweet.retweeted_status.full_text;
      } else {
        text = tweet.retweeted_status.text;
      }
      const screen_name = tweet.retweeted_status.user.screen_name;
      return 'RT @' + screen_name + ': ' + text;
    } else {
      return tweet.full_text ? tweet.full_text : tweet.text;
    }
  }

  _filter_tweets(tweets, filters) {
    if (!filters) {
      return tweets;
    }
    for (let filter of filters) {
      tweets = filter.filter(tweets);
    }
    return tweets;
  }

  /**
   * Returns a filter object that extracts only the public user's tweets.
   * @returns {Filter} A filter object that extracts only the public user's tweets
   */
  static public_users_filter() {
    return new PublicUsersFilter();
  }
}

module.exports = TwitterRSSFeed;

