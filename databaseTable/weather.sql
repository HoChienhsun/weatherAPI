create table test.weather
(
    PK int AUTO_INCREMENT,
    location varchar(10),
    MinT varchar(10),
    MaxT varchar(10),
    Wx varchar(10),
    PoP varchar(20),
    CI varchar(20),
    startTime datetime,
    endTime datetime,
    PRIMARY KEY(location,startTime),
    UNIQUE KEY(PK)
)