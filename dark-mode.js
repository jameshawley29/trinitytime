let on = false;

document.getElementById("verison-num").onclick = set_dark_mode;

document.getElementById("ms-button").onclick = function(){set_grade(false)};
document.getElementById("hs-button").onclick = function(){set_grade(true)};

function set_grade(is_hs) {
    localStorage.setItem("is_hs",is_hs);
    console.log("rn its: ", is_hs);

    if (is_hs) {
        document.getElementById("hs-button").classList.add("grade-selected");
        document.getElementById("ms-button").classList.remove("grade-selected");
    } else {
        document.getElementById("ms-button").classList.add("grade-selected");
        document.getElementById("hs-button").classList.remove("grade-selected");
    }


    setTimeout(function(){ on_open() }, 999);
}

function set_dark_mode() {
    on = !on;
    console.log("on: ", on);
    document.getElementById("block").style.backgroundColor = on ? "rgb(0,0,0)" : "rgb(250,250,250)";
    document.body.style.backgroundColor = on ? "rgb(0,0,0)" : "rgb(250,250,250)";
    document.getElementById("description").style.color = on ? "rgb(200,200,200)" : "rgb(0,0,0)";
    document.getElementById("verison-num").style.color = on ? "rgb(200,200,200)" : "rgb(0,0,0)";
    //document.getElementById("clock").style.color = on ? document.getElementById("clock").style.color : new_color;
}

let is_hs = localStorage.getItem("is_hs");
is_hs = (is_hs == "true");

console.log("HS IS: ", is_hs);

set_grade(is_hs);
