/**
* JavaScript code for civicinfo.representatives.representativeInfoByAddress
* https://developers.google.com/explorer-help/code-samples#javascript
*/

//Init App after load
if(window.attachEvent) {
  window.attachEvent('onload', init);
} else {
  if(window.onload) {
      var curronload = window.onload;
      var newonload = function(evt) {
          curronload(evt);
          init(evt);
      };
      window.onload = newonload;
  } else {
      window.onload = init;
  }
}

//Load Client
function loadClient() {
let API_KEY = "AIzaSyAJzRTiaQvUM6wvXV-rXYJJUMoh8czJgws";
gapi.client.setApiKey(API_KEY);
return gapi.client.load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
    .then(function() { console.log("GAPI client loaded for API"); revealForm(); },
          function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded before calling this method.
function execute() {
  let address = document.getElementById("address");
  if (address.value.length < 1) {
      alert ('You must add an address');
      return;
  }

  return gapi.client.civicinfo.representatives.representativeInfoByAddress({
    "address": address.value + " North Carolina, United States"
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              if(response.result.normalizedInput.zip) {
                displayResults(response.result);
                console.log("Response", response);
              } else {
                displayError("Please specify the address better by adding more details such as zip code.");
              }
            },
            function(err) { displayError(err.result.error.message); });
}
gapi.load("client");

var resultsContainer;
/**
 * Init App
 */
 function init() {
  loadClient();
  resultsContainer = document.getElementById("results_container");
}

/**
 * Displays the error status in the frontend
 */
 function displayError(err) {
  resultsContainer.innerHTML = err;
}

/**
 * Displays the search results in the frontend
 */
 function displayResults(result) {
   let normalizedInput = "Results for " + result.normalizedInput.line1;
   normalizedInput += " " + result.normalizedInput.city;
   normalizedInput += " " + result.normalizedInput.state;
   normalizedInput += " (" + result.normalizedInput.zip + ")";
  resultsContainer.innerHTML = normalizedInput;
}

/**
 * Reveal the search form in the frontend
 */
 function revealForm() {
  document.getElementById("address").className = "visible";
  document.getElementById("execute-search-btn").className = "visible";
  document.getElementById("loader").className = "invisible";
}
