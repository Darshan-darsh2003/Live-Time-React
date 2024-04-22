import React, { useState, useEffect } from "react";
import Select from "react-select";
import moment from "moment-timezone";

function App() {
  const [timeZone, setTimeZone] = useState(moment.tz.guess());
  const [currentTime, setCurrentTime] = useState(moment().tz(timeZone));

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentTime(moment().tz(timeZone));
    }, 1000);

    return () => clearInterval(intervalID);
  }, [timeZone]);

  const handleTimeZoneChange = (selectedOption) => {
    setTimeZone(selectedOption.value);
  };

  const timeZonesOptions = moment.tz.names().map((name) => ({
    value: name,
    label: name,
  }));

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="date">{currentTime.format("LL")}</div>
        <Select
          value={{ value: timeZone, label: timeZone }}
          onChange={handleTimeZoneChange}
          options={timeZonesOptions}
        />
      </div>
      <h1>Current Time</h1>
      <div
        className="big-time"
        style={{
          fontFamily: "sans-serif",
          fontWeight: 700,
          fontSize: "100px",
        }}
      >
        {currentTime.format("HH:mm:ss")}
      </div>
    </div>
  );
}

export default App;
