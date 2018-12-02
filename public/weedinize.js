// function queryURL() {
//     // queryURL is the url we'll use to query the API
//     var queryURL = "";
  
//     // Begin building an object to contain our API call's query parameters
//     // Set the API key
//     var queryParams = { "" };
  
    
//     if (parseInt(startYear)) {
//       queryParams.begin_date = startYear + "0101";
//     }
  
 
//     // Logging the URL so we have access to it for troubleshooting
//     console.log("---------------\nURL: " + queryURL + "\n---------------");
//     console.log(queryURL + $.param(queryParams));
//     return queryURL + $.param(queryParams);
//   }
  
  /**
   * takes API data (JSON/object) and turns it into elements on the page
   * @param {object} NYTData - object containing NYT API data
   */

  function clear(){
    $()
  }
$("#submit").on('click', function(event){
        event.preventDefault();
        
        
        //This lines grab the image URL
        var imageInput = $("#image").val().trim();
        
        //Inserting the imageInput query to the endpoints with Apikey
        var weedURL =""+imageInput+APIKEY
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

        //This code empty the input image form
        $("#image").empty();

        $.ajax({
            url: queryURL,
            method:"GET"
        }).then(function(response){
            $(".imageThumbnail").text(JSON.stringify(response))
        });

 })