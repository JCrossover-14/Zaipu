function TimeButtons({ daysFilter, updateDaysFilter }) {
    const timeOptions = [
      { label: "1W", days: 7 },
      { label: "1M", days: 30 },
      { label: "3M", days: 90 },
      { label: "6M", days: 180 },
      { label: "1Y", days: 365 },
      { label: "All", days: 99999 },
    ];
  
    return (
      <div id="time-btns-div">
        {timeOptions.map(({ label, days }) => (
          <button
            key={days}
            className={`time-btn ${daysFilter == days ? "selected" : ""}`}
            onClick={() => updateDaysFilter(days)}
          >
            {label}
          </button>
        ))}
      </div>
    );
  }
  
  export default TimeButtons;
  