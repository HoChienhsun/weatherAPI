const schedule = require('node-schedule');
const FetchWeatherData = require('../module')

function main(){
    const TP = new FetchWeatherData('臺北市');
    const NT = new FetchWeatherData('新北市');
    const TY = new FetchWeatherData('桃園市');
    let rule = new schedule.RecurrenceRule();
    rule.minute = new schedule.Range(0, 59, 1); // every four minutes 	 
    let scheduler = schedule.scheduleJob(rule, function(){
      TP.getData();
      NT.getData();
      TY.getData();
    });
  }
module.exports = main;