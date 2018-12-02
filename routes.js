var router = require("express").Router();
var path = require("path");

const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '7934b3f0139445e68b0ce91485e6c43e'
});

var calculate_type = (url) => {
    var promise = new Promise((resolve, reject)=>{

    let percentages = [];
    let largest = 0;
    let type;
    app.models.initModel({id: "Cannabis", version: "886e67b299024fa99e578ef884c88eca"})
            .then(generalModel => {
            return generalModel.predict(url);
            })
            .then(response => {
            var concepts = response['outputs'][0]['data']['concepts'];
            console.log(concepts);
            for(let i =0; i < concepts.length; i++) {
                percentages.push(concepts[i].value);
            };
            percentages.sort((a, b) => b - a);
            percentages[0] = largest;
            for (let i=0; i<concepts.length;i++) {
                console.log('>>>>', i);
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
            console.log(largest);
            let data = {percent: largest, type: type};
            resolve(data);
            });
            return promise;
            }).catch(err =>  {
                console.error(err);
            });
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
    console.log('<<<<<', results);
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