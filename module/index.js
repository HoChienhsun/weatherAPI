const https = require( 'https');
const config = require('config');
const testDB =config.get('test');
const host = config.get('host');
const auth = config.get('auth');
const pathCity = config.get('city_path');
const mysql = require('../mysql.js');
const schedule = require('node-schedule');

class FetchWeatherData {
   constructor(location) {
    this.location = location;
  }
  getData() {
    function sql(obj,table){
      this.obj = obj;
      this.table = table;
    }
    sql.prototype.insert = function(){  
      mysql.query(`INSERT INTO ${this.table} set ? ON DUPLICATE KEY UPDATE ?`,[this.obj,this.obj]);
     //console.log(this.obj+ " storage was completed");
    }
    const url = new URL(pathCity, host);
    url.searchParams.append('Authorization', auth);
    url.searchParams.append('format', 'JSON');
    url.searchParams.append('locationName', this.location);
    url.searchParams.append('timeFrom', '2020-07-20 19:00:00');
    url.searchParams.append('timeTo', '2020-07-21 00:00:00');
    let data = '';
    https.get(url, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        const map = {};
        res.on('data', (_data)=> {
          data += _data.toString();
        });
        res.on('end', () => {
          console.log(
            JSON.parse(data).records.datasetDescription,
            JSON.parse(data).records.location[0].locationName
          );
          JSON.parse(data)
            .records.location[0].weatherElement.map((element) => {
              return element.time.reduce((acc, value) => {
                let parameterUnit = '';
                if (value.parameter.parameterUnit !== undefined) {
                  parameterUnit =
                    value.parameter.parameterUnit === '百分比'
                      ? '%' + ' 降雨機率'
                      : value.parameter.parameterUnit;
                }
                return {
                  ...acc,
                  [value.startTime]: {
                    endTime: value.endTime,
                    [element.elementName]:
                      value.parameter.parameterName + parameterUnit,
                  },
                };
              }, {});
            })
            .forEach((element) => {
              for (const [key, value] of Object.entries(element)) {
                if (!map[key]) map[key] = {
                  ...value,
                  startTime:key,
                  location:JSON.parse(data).records.location[0].locationName  
                };
                else {
                  let {endTime,...rest} = value;
                  map[key] = {
                    ...map[key],
                    ...rest
                  };
                }
              }
            });
          for(let i=0;i<Object.values(map).length;i++){
            let storeToSQL = new sql(Object.values(map)[i],testDB.get("weather"));
            storeToSQL.insert();
          }
          //for(let i=0;i<Object.values(map).length;i++){
          //  console.log(Object.values(map)[i]);
          //  let storeToSQL = new sql(Object.values(map)[i],testDB.get("weather"));
           // storeToSQL.insert();
          //}
        });
      }
    });
  }
}
function test() {
  const x = new FetchWeatherData('臺北市');
  x.getData();
}

function main(){
  const TP = new FetchWeatherData('臺北市');
  const NT = new FetchWeatherData('新北市');
  const TY = new FetchWeatherData('桃園市');
  TP.getData();
  NT.getData();
  TY.getData();
  let rule = new schedule.RecurrenceRule();
  rule.minute = new schedule.Range(0, 59, 1); // every four minutes 	 
  let scheduler = schedule.scheduleJob(rule, function(){
    TP.getData();
    NT.getData();
    TY.getData();
  });
}
main();
module.exports = FetchWeatherData;
