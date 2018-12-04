var router = require("express").Router();
var path = require("path");
const ENV = require("dotenv");
ENV.config();
const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: process.env.apiKey
});

var calculate_type = async (url) => {

    let percentages = [];
    let largest;
    let type;
    let generalModel = await app.models.initModel({id: "Cannabis", version: "886e67b299024fa99e578ef884c88eca"});
    let response = await generalModel.predict(url);  
    var concepts = response['outputs'][0]['data']['concepts'];
            console.log(concepts);
            for(let i =0; i < concepts.length; i++) {
                percentages.push(concepts[i].value);
            };
            console.log(percentages);
            percentages.sort((a, b) => b - a);
            largest = percentages[0];
            for (let i=0; i<concepts.length;i++) {
                console.log('>>>>', i);
                console.log(concepts[i].value)
                if (concepts[i].value == largest) {
                    type = concepts[i].name;
                }
            }
            // for (i=0; i<=concepts.length;i++){
            //     let largest = percentages[i]
            //     if (percentages[i]>largest) {
            //         largest=percentages[i];
            //         type=concepts[i];
            //     }
            // };
            console.log('largest>> ', largest);
            let data = {percent: largest, type: type};
            console.log(data);
            return data;

};

router.get('/', function(req, res) {
            res.sendFile(path.join(__dirname, './public/index.html'), function(err) {
            if (err) {
                res.status(500).send(err)
            }
            })
});

router.get('/upload', function(req, res) {
    res.sendFile(path.join(__dirname, './public/upload.html'), function(err) {
    if (err) {
        res.status(500).send(err)
    }
    })
});

router.post('/calculate', async function(req, res) {
    console.log(req.body);
    let results = await calculate_type(req.body.img_url);
    console.log('<<<<<!!!', results);
   // let results = {percent: 40, type: 'sativa!'}
    res.json(results);
});

router.get('/recommended', function(req, res) {
    res.sendFile(path.join(__dirname, './public/recommended.html'), function(err) {
    if (err) {
        res.status(500).send(err)
    }
    })
});
            
module.exports = router;