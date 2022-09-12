/*


//check local storage
let user_id = localStorage.getItem("user_id");
//if theres something there call mongodb func with val
let base_url = "https://data.mongodb-api.com/app/trinity-schedule-pazfo/endpoint/user";
let params = "";
if (user_id != null) {
    params = "?user_id=" + user_id;
}
//if not call mongodb func with no val

//get back a value
//if the value is the same as the val in local storage then do nothing
//else change local storage to be the new val

fetch(base_url+params, {
    method: "POST"
}).then(res => {
    res.json().then(new_user_id => {
        localStorage.setItem("user_id", new_user_id);
    })
})

//hehe
var nAgt = navigator.userAgent;
let lol = nAgt.substring(nAgt.indexOf("(")+1);
lol = lol.substring(0,lol.indexOf(")"));

console.log("nver: ",lol);


*/
//NEED to FIX THISSSSSSS