const mUrl= '/api/FilatovIvan/lab1/lab_first';

var express = require('express');
    app = express();

app.get('/', function(request, response) {
  response.send("<h4> "+ mUrl + "task1</h4>  "+
  "<h4> "+ mUrl + "task2?adress=-yandex</h4>  "+
  "<h4> "+ mUrl + "task3?array=1000&array=2000&array=3000&array=4000</h4>")
});

app.get(mUrl + "task1", function (req, res) {
let text="";
function doHomework(subject, callback) {
  text +=`Starting my ${subject} homework.`;
  text+='\n';
  callback();
  res.send(text);
}
function alertFinished(){
  text +='Finished my homework';
}
doHomework('math', alertFinished);
});

app.get(mUrl + "task2", function (req, res) {
    function onlyLettersAndDigits(str) {
    return str.match("^[a-zA-Z0-9-]+$");
    //+
        // \d [0-9]
        // \s whitespace
        // * повторение предыдущего символа
}

let answer = req.query.adress;
if (!(1<answer.length<256)) res.send(`This adress: "${answer}" isn't a domain`)
else{
let strArr = answer.split('.');
	for (let i =0; i< strArr.length; i++){
		if ((strArr[i].length<2) || (strArr[i].length>63)) res.send(`This adress: "${answer}" isn't a domain`)
			else{
    		if (onlyLettersAndDigits(strArr[i]) && strArr[i][0] != '-' && answer[answer.length-1] != '-' && !answer.includes('--'))
		{
		 if (i == strArr.length -1) res.send(`This adress: "${answer}" is a domain`)
			 continue;
		}
    		else {
       		 	res.send(`This adress: "${answer}" isn't a domain`);
    }}}}
});


app.get(mUrl + 'task3', function (req, res) {
    let res1 = req.query.array;
if (res1.length % 2 !=0) res.send(`Wrong number of times`)
    else{
const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise1 выполнен');
    }, res1[0]);
setTimeout(() => {
        reject('error');
}, res1[1]);
});
const promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise2 выполнен');
    }, res1[2]);
setTimeout(() => {
        reject('error');
}, res1[3]);
});
Promise.all([promise1, promise2])
    .then((data) => res.send("Promise complete"))
    .catch((error) => res.send("error"));
}});
app.listen(3000, function(){});
