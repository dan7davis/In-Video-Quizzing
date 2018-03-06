 
var actionBody

////////////////////////////////////////////////////////
//                Setting Video Markers               //
////////////////////////////////////////////////////////

 // load video object
      var video = videojs('example_video_1', {
        "playbackRates": [ 0.25, 0.5, 1, 1.5, 2]
      });

      //load markers
      video.markers({
        markers: [
          {time: 166,  text: "Quiz 1"},
          {time: 318,  text: "Quiz 2"}
        ]
      });

// Video With Markers Docs
// http://videojs.com/advanced/
// http://docs.videojs.com/docs/api/player.html
// https://github.com/peter-hank/video-with-markers


// Set up hotkeys

video.ready(function() {
  this.hotkeys({
    volumeStep: 0.1,
    seekStep: 5,
    enableModifiersForNumbers: false
  });
});

////////////////////////////////////////////////////////
//            Constructing Quiz Questions             //
////////////////////////////////////////////////////////

// Quiz Question 1

Survey
    .StylesManager
    .applyTheme("default");

var json1 = {
    questions: [
        {
            type: "radiogroup",
            name: "car",
            title: "What are the 3 aspects of a design we can simulate?",
            isRequired: true,
            colCount: 1,
            choices: [
                "Technical Function, Form, and Operation",
                "Usage, Technical Function, and Form",
                "Performance, Validity, and Risk",
                "Materials, Production, and Price"
            ]
        }
    ]
};

window.survey1 = new Survey.Model(json1);
survey1
    .onComplete
    .add(function (result) {
        actionBody = String("Response 1: " + result.data.car);
        sendData();
    });


$("#surveyElement1").Survey({model: survey1});

// Quiz Questions2

Survey
    .StylesManager
    .applyTheme("default");

var json2 = {
    questions: [
        {
            type: "radiogroup",
            name: "car",
            title: "According to the narrator, what is the disadvantage of using 3D printing for rapid prototyping?",
            isRequired: true,
            colCount: 1,
            choices: [
                "3D modeling software is expensive and difficult to learn",
                "It does not allow for manual manipulation of the prototype",
                "It is not as precise as modeling my hand",
                "The design needs to be completed in advance"
            ]
        }
    ]
};

window.survey2 = new Survey.Model(json2);
survey2
    .onComplete
    .add(function (result) {
        actionBody = String("Response 2: " + result.data.car);
        sendData();
    });


$("#surveyElement2").Survey({model: survey2});






////////////////////////////////////////////////////////
//            Video Player Interaction                //
////////////////////////////////////////////////////////
$(".vjs-progress-control vjs-control").click(function(){
  hideQuiz();
  $("#surveyElement1").css("display", "none");
  $("#surveyElement2").css("display", "none"); 
});


$(".vjs-control-bar").click(function(){
  hideQuiz();
  $("#surveyElement1").css("display", "none");
  $("#surveyElement2").css("display", "none"); 
});


$("video").click(function(){
  hideQuiz();
  $("#surveyElement1").css("display", "none");
  $("#surveyElement2").css("display", "none"); 
});

var submissions = 0;
$(".sv_complete_btn").click(function(){
  submissions++;
  video.currentTime(v.currentTime+1);
  $("#surveyElement1").css("display", "none");
  $("#surveyElement2").css("display", "none");
  video.play(); 
  if(submissions >=2){
    $("button").attr('class', 'btn btn-primary');
  }
});



function hideQuiz(){
  if($("#surveyElement1").css("display") == "block" || $("#surveyElement2").css("display") == "block"){
    console.log("hide quiz");
    $("#surveyElement1").css("display", "none");
    $("#surveyElement2").css("display", "none");
    video.currentTime(v.currentTime+2);
    video.play();
  }
}


////////////////////////////////////////////////////////
//               Logging User Behavior                //
////////////////////////////////////////////////////////

// from https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events

var v = document.getElementsByTagName("video")[0];

// Pause Events
v.addEventListener("pause", function() { 
  console.log("pause at: " + v.currentTime);
  actionBody = String("pause at: " + v.currentTime);
  sendData(); 
}, true);


// Play Events
v.addEventListener("play", function() {
    console.log("play at: " + v.currentTime);
    actionBody = String("play at: " + v.currentTime);
    sendData(); 
  }, true);


// Rate Change Events
v.addEventListener("ratechange", function() { 
  console.log("rate change to: " + v.playbackRate);
  actionBody = String("rate change to: " + v.playbackRate);
  sendData(); 
}, true);


// Seeking Events
// https://stackoverflow.com/questions/29090378/how-to-get-the-starting-point-of-a-seeking-event-in-html5-video#
v.addEventListener('timeupdate', function(e){
var that = this;
(function(){
  setTimeout(function(){
    that.BP=that.currentTime;
    }, 500);
  }).call(that);}
  );

v.addEventListener('seeking', function(e){
  actionBody = String('seekFrom = '+this.BP+
        " seekTo = "+this.currentTime);
  sendData();
  })
function log(txt){console.log(txt)}


// Tab Visibility

var tabCount = Number(localStorage.getItem("tabCount")) - 1;
document.addEventListener("visibilitychange", function() {
  console.log( document.visibilityState );
  video.pause();
  if(document.visibilityState == "hidden"){
    tabCount += 1;
    localStorage.setItem("tabCount", tabCount);
    actionBody = String("hidden " + tabCount);
    sendData();
    if(tabCount > 4){
      document.removeChild(document.documentElement);
    }
    alertify.confirm("Warning: You left the tab " + tabCount + "/4 times.", function () {
          // user clicked "ok"
      }, function() {
          // user clicked "cancel"
    }).set('basic', true).closeOthers();
  } else {    
    actionBody = String("visible");
    sendData();
  }
});


// Page Loads

$( document ).ready(function() {
    actionBody = String("Page loaded");
    sendData();
    var tabCount = Number(localStorage.getItem("tabCount")) - 1;
    if(tabCount > 4){
      document.removeChild(document.documentElement);   
    };
    if(localStorage.getItem("watched1") == "true"){
      $("button").attr('class', 'btn btn-primary');
    }
});



////////////////////////////////////////////////////////
//               Delivering Questions                 //
////////////////////////////////////////////////////////
// https://stackoverflow.com/questions/19355952/make-html5-video-stop-at-indicated-time
v.addEventListener("timeupdate", function(){
    if(this.currentTime >= 166 && this.currentTime <= 167) {
        // console.log("Quiz");
        this.pause();
        $("#surveyElement1").css("display","block");
        console.log("Question 1 delivered");
        actionBody = String("Question 1 delivered");
        sendData();
    } else if (this.currentTime >=319 && this.currentTime <= 320) {
        // console.log("Quiz");
        video.pause();
        $("#surveyElement2").css("display","block");
        console.log("Question 2 delivered");
        actionBody = String("Question 2 delivered");
        sendData();
    } else {
      // console.log("No Quiz");
    }
});




////////////////////////////////////////////////////////
//               Enable Next Button                   //
////////////////////////////////////////////////////////
var timeCount = 0;
var duration = v.duration;

v.addEventListener("timeupdate", function(){
  timeCount++;
  if(timeCount >= 400 && submissions >= 2){
    $("button").attr('class', 'btn btn-primary');
    localStorage.setItem("watched1", true);
  }
});



////////////////////////////////////////////////////////
//               Sending Events to Server             //
////////////////////////////////////////////////////////

var name = localStorage.getItem("exp_id")
$("#user").text("You are user: "+ name)
var videoID = document.title;

var settings;

function sendData() {
  settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://crowd-events.herokuapp.com/api/events",
  "method": "POST",
  "data": {
    "name": name,
    "action": actionBody,
    "video": videoID
  }
}


  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}




































































