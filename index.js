async function on_open() {

    let is_hs = localStorage.getItem("is_hs");
    if (is_hs == null) {
        is_hs = true;
        localStorage.setItem("is_hs", true)
    }
    //is_hs = (is_hs == "true")

    console.log("re calling: ", is_hs);
    let response = fetch(`https://data.mongodb-api.com/app/trinity-schedule-pazfo/endpoint/tpstime_info?is_hs=${is_hs}`);
    let obj = response.then(res => {
        return res.json();
    });


    
    obj.then(res => {
        console.log(res.day, res.week, res.schedule);

        set_day(res.day);

        set_week(res.week);

        //let test_schedule = [{name: "period 2", time: ["19:00","19:50"]}]

        //set_clock(res.schedule);
        set_clock(res.schedule);
    });

}

on_open();

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

