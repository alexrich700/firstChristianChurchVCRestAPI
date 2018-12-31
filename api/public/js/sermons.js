// /* global $ */
// $(document).ready(function(){
//   $.getJSON("/api/videos")
//   .then(addSermons);
  
//   $('.form').keypress(function(sermon){
//     if(event.which == 13) {
//       createSermon();
//     }
//   });
  
//   $('.list').on('click', '.delete', function(e){
//     e.stopPropagation();
//     removeEvent($(this).parent());
//   });

// }); // end ready function

// //displays text
// function addSermons(sermons) {
//   //add texts to page here
//   sermons.forEach(function(sermon){
//     addSermon(sermon);
//     console.log(sermon._id);
//   });
// }

// //format text
// function addSermon(sermon){
//   var newSermon = $(
//     '<div class="col-md-3 col-sm-6 col-xs-12 event-text"><h4 class="event-title">'
//     +sermon.vidPath +
//     '</h4><video id="videoPlayer" controls=""><source src="https://rest-api-alexrich700.c9users.io/api/videos/'
//     +sermon._id+
//     '" type="video/mp4"></video></div>'
//     );
//   newSermon.data('id', sermon._id);
//   $('.list').append(newSermon);
// }

// function createSermon(){
//   //send request to create new event
//   var usrTitle = $('#newTitleInput').val();
//   var usrVid = $('#newVideoInput').val();
//   $.post('/api/videos',{title: usrTitle, videoFile: usrVid} )
//   .then(function(newSermon){
//     $('#newTitleInput').val('');
//     // $('#newVideoInput').val('');
//     addSermon(newSermon);
//   })
//   .catch(function(err){
//     console.log(err);
//   });
// }

// function removeEvent(event){
//   var clickedId = event.data('id');
//   var deleteUrl = '/api/events/' + clickedId; 
//   $.ajax({
//     method: 'DELETE',
//     url: deleteUrl
//   })
//   .then(function(data){
//     event.remove();
//   })
//   .catch(function(err){
//     console.log(err);
//   });
// }


//////////////////////////////////////START YOUTUBE API//////////////////////////////////////////


/*
Copyright 2015 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var GoogleAuth; // Google Auth object.
function initClient() {
  gapi.client.init({
      'apiKey': 'AIzaSyCn2g8gI_LG0ChGJsd8FjJlu1hrVoI2Ro0',
      'clientId': '365323935043-64f5mqsmokigutf35ceufj1gm7ohm1it.apps.googleusercontent.com',
      'scope': 'https://www.googleapis.com/auth/youtube.force-ssl',
      'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
  }).then(function () {
      GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
      GoogleAuth.isSignedIn.listen(updateSigninStatus);
  });
}

GoogleAuth.signIn();

GoogleAuth.isSignedIn.listen(updateSigninStatus);

var isAuthorized;
var currentApiRequest;

/**
 * Store the request details. Then check to determine whether the user
 * has authorized the application.
 *   - If the user has granted access, make the API request.
 *   - If the user has not granted access, initiate the sign-in flow.
 */
function sendAuthorizedApiRequest(requestDetails) {
  currentApiRequest = requestDetails;
  if (isAuthorized) {
    // Make API request
    // gapi.client.request(requestDetails)

    // Reset currentApiRequest variable.
    currentApiRequest = {};
  } else {
    GoogleAuth.signIn();
  }
}

/**
 * Listener called when user completes auth flow. If the currentApiRequest
 * variable is set, then the user was prompted to authorize the application
 * before the request executed. In that case, proceed with that API request.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    isAuthorized = true;
    if (currentApiRequest) {
      sendAuthorizedApiRequest(currentApiRequest);
    }
  } else {
    isAuthorized = false;
  }
}