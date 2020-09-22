const mUrl= '/api/FilatovIvan/lab1/lab_first';

var express = require('express');
    app = express();

app.get('/', function(request, response) {
  response.send("<h4> "+ mUrl + "task1?name=Ivan</h4>  "+
  "<h4> "+ mUrl + "task2?adress=-yandex</h4>  "+
  "<h4> "+ mUrl + "task3?Text1=Promis1_complete&Text2=Promise2_complete&Text3=error</h4>")
});

app.get(mUrl + "task1", function (req, res) {
    function printName(id, name) {
        name();
    }

    function name() {
        let n = req.query.name;
	res.send(n);
    }

printName(1, name);
});

app.get(mUrl + "task2", function (req, res) {
    function onlyLettersAndDigits(str) {
    return str.match("^[a-zA-Z0-9-]+$");
}

let answer = req.query.adress;
if (!(2<answer.length<255)) res.send(`This adress: "${answer}" isn't a domain`)
else{
let strArr = answer.split(".");
	for (let i =0; i< strArr.length; i++){
	if (!(2<strArr[i].length<64)) res.send(`This adress: "${answer}" isn't a domain`)
	else{
    if (onlyLettersAndDigits(strArr[i]) && strArr[i][0] != '-' && answer[answer.length-1] != '-' && !answer.includes('--')){
        res.send(`This adress: "${answer}" is a domain`);
    }
    else {
        res.send(`This adress: "${answer}" isn't a domain`);
    }}}}
});


app.get(mUrl + 'task3', function (req, res) {
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise1 выполнен');
    }, 2000);
});
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Promise2 выполнен');
    }, 1500);
});
let resText = req.query.Text1;
let resT = req.query.Text2;
resText += " ";
resText += resT;
let resTe = req.query.Text3;
Promise.all([promise1, promise2])
    .then((data) => res.send(resText))
    .catch((error) => res.send(resTe));
});
app.listen(3000, function(){});
