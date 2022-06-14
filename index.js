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
    .then(function() { console.log("GAPI client loaded for API"); },
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
    "address": address.value
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);
              displayResults();
            },
            function(err) { console.error("Execute error", err); displayError(err);});
}
gapi.load("client");

var resultsContainer;
/**
 * Init App
 */
 function init() {
  loadClient();
  revealForm();
  resultsContainer = document.getElementById("results_container");
}

/**
 * Displays the error status in the frontend
 */
function displayError(err) {
  let message = "";
  ( err.code == 400 ) ? 
  message = "Please specify the address better by adding more details such as zip code." :
  message = err.message ;
  resultsContainer = message;
}

/**
 * Displays the search results in the frontend
 */
 function displayResults(response) {
  resultsContainer.innerHTML = response;
}

/**
 * Reveal the search form in the frontend
 */
 function revealForm() {
  document.getElementById("address").className = "visible";
  document.getElementById("execute-search-btn").className = "visible";
}
