var fetch = require('node-fetch');
var subreddits = require('./subreddits.json');

async function getTop100MarketCapCoins() {
    try {
        let response = await fetch('https://api.coinmarketcap.com/v1/ticker/');
        if (response.ok) {
            let coins = await response.json();
            coins.forEach(function (coin) {
                // console.log(coin.name + ' ' + coin.market_cap_usd);

                // get subreddit name from subreddits.json
                let subreddit = subreddits[coin.name];
                if (typeof subreddit != 'undefined') {
                    console.log(subreddits[coin.name]);
                    getSubredditSubscribers(subreddit);
                }

                // call that subreddit's about.json

                // parse the subscribers key from about.json
            });
        }
    } catch (error) {
        console.log(error);
    }
}

async function getSubredditSubscribers(subreddit) {
    try {
        let response = await fetch('https://www.reddit.com/r/' + subreddit + '/about.json');
        if (response.ok) {
            let about = await response.json();
            let data = about.data;
            let numSubscribers = data.subscribers;
            console.log(numSubscribers);
        }
    } catch (error) {
        console.log(error);
    }
}

getTop100MarketCapCoins();
