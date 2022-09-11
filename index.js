async function on_open() {
    let response = fetch("https://data.mongodb-api.com/app/trinity-schedule-pazfo/endpoint/tpstime_info");
    let obj = response.then(res => {
        return res.json();
    });

    obj.then(res => {
        console.log(res.day, res.week, res.schedule);

        set_day(res.day);

        set_week(res.week);

        set_clock(res.schedule);
    });

}

function set_day(day) {
    document.getElementById("day-type").innerHTML = day;
}

function set_week(week) {
    const string_week = []
    for (day of week) {
        string_week.push(day.name.substring(0,1));
    }
    set_weekday_names(string_week);
}

function set_clock(schedule) {
    console.log("calling the get time left...");
    get_time_left(schedule, "clock", "block", "description");
}

on_open();