const userAction = async () => {
    const response = await fetch('https://us-east-1.aws.data.mongodb-api.com/app/testapp-bnqjv/endpoint/api?secret=secret');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    document.getElementById("yourH1_element_Id").innerHTML = JSON.parse(myJson);
  }