let url = "https://us-east-1.aws.data.mongodb-api.com/app/testapp-bnqjv/endpoint/user?secret=secret";

async function make_token(token, value) {
    localStorage.setItem(token, value);
    console.log(token);
}

async function get_token(token) {
    let cookie = await localStorage.getItem(token);
    return cookie;
}

 
let cookie = get_token("user_id");

cookie.then(val => {
    console.log("COOKIE: ", val);
    fetch((url+`&id=${val}`), {
        method: "POST"
    }).then(resp_obj => {
        resp_obj.json().then(resp => {
            make_token("user_id", resp);
            console.log("resp: ", resp);
        })
    });
});