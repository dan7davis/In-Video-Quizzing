var json = {
    questions: [
        {
            name: "name",
            type: "text",
            title: "Please enter your crowd flower ID:",
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
        localStorage.setItem("exp_id", result.data.name)
        window.location.href = "Video-N.html";
    });

$("#surveyElement").Survey({model: survey});