//document.getElementById("block").style.color = "#000";

function get_rgb(percent, alpha) {
    percent *= 100;
    let r = 0;
    let b = 0;
    let g = 0;
    if (percent > 50) {
        //2
        b = (100 - percent) * 5;
        //1
        g = (250 - b);
    } else {
        //3
        r = (50 - percent) * 5;
        //2
        b = (250 - r);
    }
    if (alpha == undefined) {
        alpha = 1
    }

    return `rgb(${r},${g},${b},${alpha})`;
}

function update(number) {
    const percent = number/(60)
    let rgb = get_rgb(percent);
    document.getElementById("block").style.color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    document.getElementById("block").innerHTML = number;
    number--;
    console.log(number);
    if (number > 0) {
        setTimeout(function(){update(number)}, 1000);
    }
}

//update(60);
