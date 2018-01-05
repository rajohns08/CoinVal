var fetch = require('node-fetch');

async function getTop100MarketCapCoins() {
    try {
        let response = await fetch('https://api.coinmarketcap.com/v1/ticker/');
        if (response.ok) {
            let coins = await response.json();
            coins.forEach(function(coin) {

                // get subreddit name from subreddits.json

                // call that subreddit's about.json

                // parse the subscribers key from about.json
                console.log(coin.name + ' ' + coin.market_cap_usd);
            });
        }
    } catch (error) {
        console.log(error);
    }
}

getTop100MarketCapCoins();
