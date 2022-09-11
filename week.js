function set_weekday_names(weekday_names) {
    for (let i = 1; i < 6; i++) {
        document.querySelector(`#week-schedule>p:nth-child(${i})`).innerHTML = weekday_names[i-1];
    }

    highlight_current_day();
}

function highlight_current_day() {
    let current_date = new Date();
    let weekday = current_date.getDay();


    if (weekday <= 5 & weekday >= 1) {
        document.querySelector(`#week-schedule>p:nth-child(${weekday})`).classList.add("current-day");
    }

}