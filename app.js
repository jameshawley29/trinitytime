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
    //re call
    let t = setTimeout(function(){ update_time(obj) }, 195);

    //initialize
    const name = obj.name;
    const schedule = obj.schedule;
    const params = get_next_class(schedule);
    let seconds_till_bell = params.time_left;
    let clock_color = "00fc00";

    //update
    if (seconds_till_bell < (60*5)){
        clock_color = "ff0000"
    } else if (seconds_till_bell < (60*20) ){
        clock_color = "eed202"
    }

    //assign to html
    document.getElementById("clock").innerHTML = (~~(seconds_till_bell/60)) + ":" + (seconds_till_bell%60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });

    document.getElementById("description").innerHTML = "Until " + params.class_name + " " + (params.start_period ? "Starts" : "Ends");
    
    document.getElementById("clock").style.color = `#${clock_color}`

}


function get_next_class(schedule_obj) {

    var today = new Date();
    var current_time = [today.getHours(),today.getMinutes(),today.getSeconds()];

    let times = schedule_obj.map(element => element.time);

    for (period of schedule_obj) {
        let count = 0
        for (bell of period.time) {
            let bell_time = time_string_to_seconds(bell, 2);
            let time_now_in_secs = time_string_to_seconds(current_time[0]+":"+current_time[1]) + current_time[2];

            // console.log("bell time: ", bell_time);
            // console.log("time now ", time_now_in_secs);
            // console.log("diff ", bell_time-time_now_in_secs);
            
            if (time_now_in_secs <= bell_time) {
                return {time_left: bell_time-time_now_in_secs, class_name: period.name, start_period: count==0};
            }
            
            count+=1;
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