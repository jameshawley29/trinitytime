


const userAction = async () => {
    const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/testapp-bnqjv/endpoint/api?secret=secret');
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
    // do something with myJson
    document.getElementById("test").innerHTML = myJson.name;
    currentTime(myJson.schedule);
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
