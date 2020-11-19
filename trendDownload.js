const googleTrends = require("google-trends-api");



function getInterestOverTimeFor(keyword) {
  googleTrends
    .interestOverTime({ keyword: "software engineering" })
    .then(function (results) {
      var resultsJSON = JSON.parse(results);

      var data = resultsJSON["default"];
      var timelineData = data["timelineData"];

      timelineData.forEach(function (timestamp) {
        console.log(
          `On ${timestamp["formattedTime"]}, the interest value was at ${timestamp.value}`
        );
      });
    })
    .catch(function (err) {
      console.error("Oh no there was an error", err);
    });
}


function getDailyTrendsForDay(day) {
  googleTrends
    .dailyTrends({
      trendDate: day,
      geo: "US",
    })
    .then(function (results) {
      var resultsJSON = JSON.parse(results);

      var data = resultsJSON["default"];
      var dayData = data["trendingSearchesDays"][0];
      var searches = dayData["trendingSearches"];

      console.log(`On  ${day}\n`);
      searches.forEach(function (search) {
        console.log(
          `The search term ${search["title"]["query"]} has ${search["formattedTraffic"]} traffic`
        );
      });
    })
    .catch(function (err) {
      console.error("error!", err);
    });
}

getInterestOverTimeFor("software engineer");
getDailyTrendsForDay(new Date('2020-11-15'));
