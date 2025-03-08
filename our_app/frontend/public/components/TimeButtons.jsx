function TimeButtons({updateDaysFilter}){
    return <div id="time-btns-div">
        <button class = "time-btn" onClick={() => updateDaysFilter(30)}>1M</button>
        <button class = "time-btn" onClick={() => updateDaysFilter(90)}>3M</button>
        <button class = "time-btn" onClick={() => updateDaysFilter(160)}>6M</button>
        <button class = "time-btn" onClick={() => updateDaysFilter(365)}>1Y</button>
        <button class = "time-btn" onClick={() => updateDaysFilter(99999)}>All</button>
    </div>;
}

export default TimeButtons; 