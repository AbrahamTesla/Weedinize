const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '7934b3f0139445e68b0ce91485e6c43e'
});

app.models.initModel({id: "Cannabis", version: "24b6f68b1a654372a6f17c2eab7e71f3npm"})
      .then(generalModel => {
        return generalModel.predict("https://howtogrowmarijuana.com/wp-content/uploads/2015/12/Indica-Phenotype-Short-Fat-Leaves.jpg");
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts'];
        console.log(concepts);
      }).catch(err =>  {
          console.error(err);
      })