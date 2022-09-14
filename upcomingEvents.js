async function on_start() {
    let response = fetch("https://data.mongodb-api.com/app/trinity-schedule-pazfo/endpoint/todays_events");
    let obj = response.then(res => {
        return res.json();
    });

    obj.then(schedule_objs => {
        console.log(schedule_objs);
        //add_upcoming_events(schedule_objs);
    });
}

on_start();


function add_upcoming_events(events) {
    for (element of events) {
        let p = document.createElement("p");
        p.innerHTML = `
        Description: ${element.description}
        Time: ${element.start_time}
        Location: ${element.location}
        
        `;

        document.getElementById("upcoming_events").appendChild(p);
    }
}