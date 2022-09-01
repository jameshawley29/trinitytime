const userAction = async () => {
    const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/testapp-bnqjv/endpoint/api?secret=secret');
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
    // do something with myJson
    document.getElementById("test").innerHTML = myJson.name;
    update_time(myJson);
  }

userAction();

function update_time(obj) {
    const name = obj.name;
    const schedule = obj.schedule;

    let seconds_till_bell = get_next_class(schedule);

    document.getElementById("clock").innerHTML = seconds_till_bell.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) + " - " + ~~(seconds_till_bell/60) + ":" + (seconds_till_bell%60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });

    let t = setTimeout(function(){ update_time(obj) }, 1000);
}

function get_next_class(schedule_obj) {

    var today = new Date();
    var current_time = [today.getHours(),today.getMinutes(),today.getSeconds()];

    let times = schedule_obj.map(element => element.time);

    for (period of times) {

        for (bell of period) {
            let bell_time = time_string_to_seconds(bell, 2);
            let time_now_in_secs = time_string_to_seconds(current_time[0]+":"+current_time[1]) + current_time[2];

            console.log("bell time: ", bell_time);
            console.log("time now ", time_now_in_secs);
            console.log("diff ", bell_time-time_now_in_secs);
            
            if (time_now_in_secs <= bell_time) {
                return bell_time-time_now_in_secs;
            }
    
        }    
    }
}

function time_string_to_seconds(time) {
    const middle = time.indexOf(":");
    let hours = parseInt(time.substring(0,middle));
    let minutes = parseInt(time.substring(middle+1));
    let seconds = (hours * (60**2)) + (minutes*60);
    return seconds;
}