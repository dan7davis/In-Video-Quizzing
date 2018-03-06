

var videoID = String("Login");
var actionBody = String("Begin user");
var name;
var settings;
localStorage.setItem("tabCount", Number(1));

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


var json = {
    questions: [
        {
            name: "name",
            type: "text",
            title: "Please enter the user code provided to you by the task page in CrowdFlower:",
            placeHolder: "12345",
            isRequired: true
        }
    ]
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (result) {
        console.log(result.data);
        localStorage.setItem("exp_id", result.data.name);
        name = String(result.data.name);
        sendData();
        $("button").attr('class', 'btn btn-primary');
        $("button#back").css('display', 'none');
    });

$("#surveyElement").Survey({model: survey});x