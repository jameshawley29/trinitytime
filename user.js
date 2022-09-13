


//check local storage
let user_id = localStorage.getItem("user_id");
//if theres something there call mongodb func with val
let base_url = "https://data.mongodb-api.com/app/trinity-schedule-pazfo/endpoint/user";
let params = "";
if (user_id != null) {
    params = "?user_id=" + user_id;
}
//if not call mongodb func with no val


fetch(base_url+params, {
    method: "POST"
}).then(res => {
    res.json().then(new_user_id => {
        console.log(new_user_id + 1);
        localStorage.setItem("user_id", new_user_id);
    })
})