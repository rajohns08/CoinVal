var fetch = require('node-fetch');
var subreddits = require('./subreddits.json');
let coinObjs = [];
let totalCoinsExpected = 0;

async function getTop100MarketCapCoins() {
    try {
        let response = await fetch('https://api.coinmarketcap.com/v1/ticker/');
        if (response.ok) {
            let coins = await response.json();
            coins.forEach(function (coin) {
                let subreddit = subreddits[coin.name];
                if (typeof subreddit != 'undefined') {
                    totalCoinsExpected++;
                    getSubredditSubscribers(coin.name, coin.market_cap_usd, subreddit);
                } else {
                    console.log('NEW COIN FOUND...' + coin.name);
                }
            });
        }
    } catch (error) {
        console.log(error);
    }
}

async function getSubredditSubscribers(coin, marketCap, subreddit) {
    try {
        let response = await fetch('https://www.reddit.com/r/' + subreddit + '/about.json');
        if (response.ok) {
            let about = await response.json();
            let data = about.data;
            let numSubscribers = data.subscribers;
            let value = calculateValue(numSubscribers, marketCap);
            let coinObj = {
                "name": coin,
                "value": value.toExponential()
            };
            coinObjs.push(coinObj);
            if (coinObjs.length == totalCoinsExpected) {
                coinObjs.sort(function(coin1, coin2) {
                    return coin2.value - coin1.value;
                });
                console.log(coinObjs);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function calculateValue(numSubscribers, marketCap) {
    return numSubscribers / marketCap;
}

getTop100MarketCapCoins();
