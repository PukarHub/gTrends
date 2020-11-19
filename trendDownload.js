const googleTrends = require("google-trends-api");

function getInterestOn(keyword) {
  googleTrends
    .interestOverTime({ keyword: "Women's march" })
    .then(function (results) {
      var resultsJSON = JSON.parse(results);

      var data = resultsJSON["default"];
      var timelineData = data["timelineData"]; 

      timelineData.forEach(function (timestamp) {
        console.log(
          `On the date ${timestamp["formattedTime"]}, the interest value was at ${timestamp.value}`
        );
      });
    })
    .catch(function (err) {
      console.error("Oh no there was an error", err);
    });
}


function getDailyTrendsOn(day) {
  googleTrends
    .dailyTrends({
      trendDate: day,
      geo: "US",
    })
    .then(function (results) {
      var resultsJSON = JSON.parse(results);
      var data = resultsJSON["default"];
      var dayData = data["trendingSearchesDacd gys"][0];
      var searches = dayData["trendingSearches"];

      console.log(`On the date of ${day}\n`);
      searches.forEach(function (search) {
        console.log(
          `The search term ${search["title"]["query"]} has ${search["formattedTraffic"]} traffic`
        );
      });
    })
    .catch(function (err) {
      console.error("Oh no an error!", err);
    });
}

getInterestOn("software engineer");
getDailyTrendsOn(new Date('2020-11-15'));