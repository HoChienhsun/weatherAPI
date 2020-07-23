## Set up

1. Type `npm install`.
2. Create the environment, including mysql database and set the configuration.
3. In config folder, you can set up your dev and production variable.


## Create a weather table and insert data hour by hour

1. create the table from the sql query in the folder named databaseTable.
2. you will see the row and column like below after executing the ruler to collect the weather data hour by hour.

| PK  | location | MinT | MaxT | Wx       | PoP          | CI         | startTime           | endTime             |
| --- | -------- | ---- | ---- | -------- | ------------ | ---------- | ------------------- | ------------------- |
| 1   | 臺北市   | 27C  | 36C  | 晴時多雲 | 20% 降雨機率 | 舒適至悶熱 | 2020-07-23 06:00:00 | 2020-07-23 18:00:00 |

## start server

1. execute `NODE_ENV=production node ./getWeatherData.js` to collect the weather information.
2. execute `NODE_ENV=production node ./index.js` to run your server.

## Request data with Authentication

1. I applied basic auth to this API, please include "password=test" "username=test" for your authorization header.
2. For instance, if you want to query the data about taipei city and startTime is after "2020-07-22 00:00:00", URL request will be like below, `http://localhost:4000/weather/weather?location=臺北市&&startTime=2020-07-22 00:00:00` 