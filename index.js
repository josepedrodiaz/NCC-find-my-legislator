/**
* Sample JavaScript code for civicinfo.representatives.representativeInfoByAddress
* See instructions for running APIs Explorer code samples locally:
* https://developers.google.com/explorer-help/code-samples#javascript
*/

 function loadClient() {
  let API_KEY = "AIzaSyAJzRTiaQvUM6wvXV-rXYJJUMoh8czJgws";
  gapi.client.setApiKey(API_KEY);
  return gapi.client.load("https://civicinfo.googleapis.com/$discovery/rest?version=v2")
      .then(function() { console.log("GAPI client loaded for API"); },
            function(err) { console.error("Error loading GAPI client for API", err); });
}
// Make sure the client is loaded before calling this method.
function execute() {
  return gapi.client.civicinfo.representatives.representativeInfoByAddress({
    "address": "279 Huff Dr, Jacksonville, NC 28546, Estados Unidos"
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);
            },
            function(err) { console.error("Execute error", err); });
}
gapi.load("client");
loadClient();
