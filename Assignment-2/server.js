const express = require('express')
const parser = require('body-parser')
const https = require('https')
const request = require('request');
const url = require('url');
const path = require('path');

const app=express();

app.use(express.static(path.join(__dirname, "Angular-Project")));
app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "Angular-Project/index.html"));
  });
  
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');

  if('OPTIONS' == req.method){
    res.sendStatus('200');
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
})

app.use(parser.json())

app.get('/getGeoCode', (req, res)=>{
  res.setHeader('Content-Type', 'application/json');
  var parameters=url.parse(req.url, true).query;
  request('https://maps.googleapis.com/maps/api/geocode/json?address='+encodeURI(parameters.street)+','+encodeURI(parameters.city)+','+parameters.state+'&key=AIzaSyDh0G4TJEMCEEcSohFZzzKCPxmX1OMaQdw',
  (err, resp, body)=>{
    res.json(JSON.parse(body));
  });
  console.log('/getGeoCode end!!');
})

app.get('/getForecast', (req, res)=>{
  res.setHeader('Content-Type', 'application/json');
  var parameters=url.parse(req.url, true).query;
  request('https://api.forecast.io/forecast/8198317849d928d036739acf9583118e/'+parameters.latitude+','+parameters.longitude+'?exclude=minutely,alerts,flags',
  (err, resp, body)=>{
    res.json(body);
  });
  console.log('/getForecast end!!');
})

app.get('/getRange', (req, res)=>{
  res.setHeader('Content-Type', 'application/json');
  var parameters=url.parse(req.url, true).query;
  request('https://api.darksky.net/forecast/8198317849d928d036739acf9583118e/'+parameters.latitude+','+parameters.longitude+','+parameters.time,
  (err, resp, body)=>{
    res.json(body);
  });
  console.log('/getRange end!!');
})

app.get('/getSeal', (req, res)=>{
  res.setHeader('Content-Type', 'application/json');
  var parameters=url.parse(req.url, true).query;
  request('https://www.googleapis.com/customsearch/v1?q='+parameters.state+'%20State%20Seal&cx=014622910820273969538:46c6vhmxs5w&imgSize=huge&imgType=news&num=1&searchType=image&key=AIzaSyAUffX42fiAbFJc6wEGAC9I4IV9TWHV3Pc',
  (err, resp, body)=>{
    res.json(body);
  });
  console.log('/getSeal end!!');
})

app.get('/getAutoComplete', (req, res)=>{
  res.setHeader('Content-Type', 'application/json');
  var parameters=url.parse(req.url, true).query;
  request('https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+parameters.search+'&types=(cities)&language=en&key=AIzaSyAUffX42fiAbFJc6wEGAC9I4IV9TWHV3Pc',
  (err, resp, body)=>{
    res.json(body);
  });
  console.log('/getSeal end!!');
})


var p = process.env.PORT || 8000 || 4200
app.listen(p, function () {
   console.log('Server running at 8000');
});

//https://api.darksky.net/forecast/8198317849d928d036739acf9583118e/34.0322,-118.2836,1573536251