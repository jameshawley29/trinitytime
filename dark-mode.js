let on = false;

document.getElementById("verison-num").onclick = set_dark_mode;

function set_dark_mode() {
    on = !on;
    console.log("on: ", on);
    document.getElementById("block").style.backgroundColor = on ? "rgb(0,0,0)" : "rgb(250,250,250)";
    document.body.style.backgroundColor = on ? "rgb(0,0,0)" : "rgb(250,250,250)";
    document.getElementById("description").style.color = on ? "rgb(200,200,200)" : "rgb(0,0,0)";
    document.getElementById("verison-num").style.color = on ? "rgb(200,200,200)" : "rgb(0,0,0)";
    const new_color = LightenDarkenColor(document.getElementById("clock").style.color, -20);
    //document.getElementById("clock").style.color = on ? document.getElementById("clock").style.color : new_color;
}


