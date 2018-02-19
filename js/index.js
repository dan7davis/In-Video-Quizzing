 // load video object
      var video = videojs('example_video_1');

      //load markers
      video.markers({
        markers: [
          {time: 150,  text: "Quiz 1"},
          {time: 370,  text: "Quiz 2"}
        ]
      });



// From https://stackoverflow.com/questions/29618851/how-can-i-listen-for-the-timeupdate-event-from-my-video-js-player
var curt;
video.ready(function () {
  this.on('timeupdate', function () {
    curt = this.currentTime();
  })
});


function checkk() {
  if (curt >= 149 && curt <= 151) {
    console.log("Quiz");
    video.pause();
    $("#surveyElement1").css("display","block")
  } else if (curt >=369 && curt <= 371) {
    console.log("Quiz");
    video.pause();
    $("#surveyElement2").css("display","block")
  } else {
      console.log("No Quiz");
    }
};

setInterval("checkk()", 500)

// Video With Markers Docs
// http://videojs.com/advanced/
// http://docs.videojs.com/docs/api/player.html
// https://github.com/peter-hank/video-with-markers




Survey
    .StylesManager
    .applyTheme("default");

var json1 = {
    questions: [
        {
            type: "radiogroup",
            name: "car",
            title: "What car are you driving?",
            isRequired: true,
            colCount: 4,
            choices: [
                "None",
                "Ford",
                "Vauxhall",
                "Volkswagen"
            ]
        }
    ]
};

window.survey1 = new Survey.Model(json1);



$("#surveyElement1").Survey({model: survey1});

//

Survey
    .StylesManager
    .applyTheme("default");

var json2 = {
    questions: [
        {
            type: "radiogroup",
            name: "car",
            title: "Favorite Olympic Event?",
            isRequired: true,
            colCount: 4,
            choices: [
                "None",
                "Ski",
                "Louge",
                "Skating"
            ]
        }
    ]
};

window.survey2 = new Survey.Model(json2);


$("#surveyElement2").Survey({model: survey2});








////////////////////////////////////////////////////////
$(".vjs-progress-control vjs-control").click(function(){
  $("#surveyElement1").css("display", "none");
  $("#surveyElement2").css("display", "none"); 
});


$(".vjs-control-bar").click(function(){
  $("#surveyElement1").css("display", "none");
  $("#surveyElement2").css("display", "none"); 
});


$("video").click(function(){
  $("#surveyElement1").css("display", "none");
  $("#surveyElement2").css("display", "none"); 
});


$(".sv_complete_btn").click(function(){
  video.currentTime(curt+2);
  $("#surveyElement1").css("display", "none");
  $("#surveyElement2").css("display", "none");
  video.play(); 
});


