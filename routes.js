var router = require("express").Router();
var path = require("path");

const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '7934b3f0139445e68b0ce91485e6c43e'
});

var calculate_type = (url) => {
    let percentages = [];
    let largest = 0;
    app.models.initModel({id: "Cannabis", version: "886e67b299024fa99e578ef884c88eca"})
            .then(generalModel => {
            return generalModel.predict(url);
            })
            .then(response => {
            var concepts = response['outputs'][0]['data']['concepts'];
            console.log(concepts);
            concepts.forEach(result => {
                percentages.push(result.value);
            });
            for (i=0; i<=largest;i++){
                if (percentages[i]>largest) {
                    largest=percentages[i];
                }
            };
            console.log(largest);
            return largest;
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
    console.log(JSON.parse(req.body));
    let type = await calculate_type(req.params.url);
    console.log(type);
    res.send(type);
});

router.get('/recommended', function(req, res) {
    res.sendFile(path.join(__dirname, './public/recommended.html'), function(err) {
    if (err) {
        res.status(500).send(err)
    }
    })
});
            
module.exports = router;