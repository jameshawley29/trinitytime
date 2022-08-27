let days = {
    "A" : [
        {"name": "advisory", "time": ["08:00","08:05"]},
        {"name": "1st Period", "time": ["08:10","08:55"]},
        {"name": "2nd Period", "time": ["09:00","09:45"]},
        {"name": "Break/Flex", "time": ["09:50","10:00"]},
        {"name": "3rd Period", "time": ["10:05","10:50"]},
        {"name": "4th Period", "time": ["10:55","11:40"]},
        {"name": "5th Period", "time": ["11:45","12:30"]},
        {"name": "US lunch", "time": ["12:35","13:15"]},
        {"name": "6th Period", "time": ["13:20","14:05"]},
        {"name": "7th Period", "time": ["14:10","14:55"]}
    ],
    "B" : [
        {"name": "advisory", "time": ["08:00","08:05"]},
        {"name": "1st Period", "time": ["08:10","08:55"]},
        {"name": "2nd Period", "time": ["09:00","09:45"]},
        {"name": "Break/Flex", "time": ["09:50","10:00"]},
        {"name": "3rd Period", "time": ["10:05","10:20"]},
        {"name": "4th Period", "time": ["10:55","11:40"]},
        {"name": "5th Period", "time": ["11:45","12:30"]},
        {"name": "US lunch", "time": ["12:35","13:15"]},
        {"name": "6th Period", "time": ["13:20","14:05"]},
        {"name": "7th Period", "time": ["14:10","14:55"]}
    ]
}


const userAction = async () => {
    const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/testapp-bnqjv/endpoint/api?secret=secret');
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
    // do something with myJson
    document.getElementById("test").innerHTML = myJson.description;
    currentTime(days.A);
  }
  userAction();


function timetoint(time) {
    hh = time.substring(0,2)
    mm = time.substring(3)
    return [parseInt(hh),parseInt(mm)];
}

function getEndOfClass(day) {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    for (element of day) {
        let time = element.time;
        console.log(time);
        let inttime = timetoint(time[1])

        if((hh*60)+mm < inttime[0]*60+inttime[1]){
            let diff = [inttime[0]-hh,inttime[1]-mm-1,60-ss];
            console.log("diff = ", diff);
            return [diff, element.name];
        }
    }
}

function currentTime(day) {
    let lol = getEndOfClass(day);
    let thing = lol[0];
    console.log(thing);
    let things = thing[0] + ":" + thing[1] + ":" + thing[2];

    document.getElementById("clock").innerText = lol[1] + " " + things; 
    let t = setTimeout(function(){ currentTime(day) }, 1000);
}
