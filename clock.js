function get_time_left(schedule_obj, clock_id, color_change_id, description_id) {
    let linear_time_pairs = schedule_obj.map(element => element.time);
    //console.log(linear_time_pairs);
    let linear_time = []
    for (i of linear_time_pairs) {
        linear_time.push(i[0]);
        linear_time.push(i[1]);
    }
    //console.log(linear_time);

    //set start index
    let index = 0;

    function update() {
        let current_time = new Date();
        current_time_ss = timestring_to_seconds(`${current_time.getHours()}:${current_time.getMinutes()}`) + current_time.getSeconds();

        for (bell_time of linear_time.slice(index)) {
            const bell_time_ss = timestring_to_seconds(bell_time);
            //console.log("diff: ", bell_time_ss-current_time_ss);

            if (current_time_ss <= bell_time_ss) {
                //CHANGE ALL DOCUMENT ATTRIBUTES

                //diff in mins
                const diff = (bell_time_ss-current_time_ss);
                //console.log("diff: ", diff);
                document.getElementById(clock_id).innerHTML = time_diff_to_time_string(diff);

                
                
                //name of period
                const period_num = Math.round((index+1)/2);
                //console.log("period num: ", period_num);
                //console.log("period name: ", schedule_obj[period_num-1].name);

                const period_name = schedule_obj[period_num-1].name;
                const is_start = index%2==0

                
                //change description
                document.getElementById(description_id).innerHTML = get_description(period_name, is_start);


                //color
                if (index > 0) {
                    const class_length = timestring_to_seconds(linear_time[index]) - timestring_to_seconds(linear_time[index-1]);
                    //new color
                    const color = get_rgb(diff/class_length);
                
                    //console.log(get_rgb(diff/class_length));
                    document.getElementById("clock").style.color = color;
                    document.getElementById("day-type").style.color = color;


                    //INFO BLOCK CHANGE
                    document.getElementById("info-block").style.backgroundColor = get_rgb((diff/class_length),0.6);

                }


                return true;
            }

            //add 1 to index
            index++;

            //if ran out of class
            if (index >= (schedule_obj).length*2) {
                document.getElementById("clock").innerHTML = "0:00";
                document.getElementById("description").innerHTML = "No More School"
                console.log("no more class");
                return false;
            }
        }
    }


    function run() {
        let result = update();

        if (result) {
            setTimeout(function(){ run() }, 999);
        }
    }

    run();
    
}

//get_time_left([{time : ["17:40","18:40"], name : "History"}, {time : ["19:00","19:12"], name : "Math"}]);



function timestring_to_seconds(time) {
    const middle = time.indexOf(":");
    let hours = parseInt(time.substring(0,middle));
    let minutes = parseInt(time.substring(middle+1));
    let seconds = (hours * (60**2)) + (minutes*60);
    return seconds;
}

function time_diff_to_time_string(diff) {
    return (~~(diff/60)) + ":" + (diff%60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      });
}

function get_description(period_name, is_start) {
    return `Time until ${period_name} ${is_start ? "starts" : "ends"}${window.innerWidth<500? "" : ":"}`;
}
