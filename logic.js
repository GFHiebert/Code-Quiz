
var timer = 75;
var questionIndex = 0;
var questionRandomArray = [];
var quizStarted = false;
var score = 0;




$(".choice-button").on("click", function () {
    console.log("Choice chosen");
    displayNextQuestion();
})

// Listeners
$("#start-button").on("click", function () {
    console.log("Button clicked");
    $("#intro").attr("class", "hide");
    // $("#intro").removeChild("<h2>");
    questionRandomArray = scrambleOrder(questions.length);
    displayNextQuestion();
})

//Show questions and choices
function displayNextQuestion() {
    if (quizStarted == false) {
        $("#timer").text(timer);
        startQuizTimer();
        quizStarted = true;
    }
    $("#questions").empty();
    $("#questions").removeClass("hide");

    $("#question").text(questions[questionRandomArray[questionIndex]].title);
    var choiceLength = questions[questionRandomArray[questionIndex]].choices.length;
    var choiceRandomArray = scrambleOrder(choiceLength);

    var questionEl = $("<h2>");
    questionEl.text(questions[questionRandomArray[questionIndex]].title);
    $("#questions").append(questionEl);

    for (var i = 0; i < choiceLength; i++) {
        var choiceEl = $("<button>");
        choiceEl.addClass("choice-button");
        choiceEl.text(questions[questionRandomArray[questionIndex]].choices[choiceRandomArray[i]]);
        $("#questions").append(choiceEl);
    }
    //$("#questions").append($("<button>").attr("id","the-one-button").text("The One Button"));

    $(".choice-button").on("click", function () {
        console.log("Choice chosen");
        if ($(this).text() == (questions[questionRandomArray[questionIndex]].answer)) {
            console.log("Correct")
            console.log($(this).text() + " = " + (questions[questionRandomArray[questionIndex]].answer));
            console.log(questionIndex);
        } else {
            console.log("Wrong")
            console.log($(this).text() + " != " + (questions[questionRandomArray[questionIndex]].answer));
            console.log(questionIndex);
            timer -= 15;
            $("#timer").text(timer);
        }

        if (questions.length > questionIndex + 1) {
            questionIndex++;
            displayNextQuestion();
        } else {
            $("#questions").empty();
            score = timer;
            enterInitials(score);
            timer = 1;
            quizStarted = false;
            $("#timer").text(timer);
        }


    })


}

function startQuizTimer() {
    var timeInterval = setInterval(function () {
        timer--;
        $("#timer").text(timer);
        if(quizStarted == false) {
            clearInterval(timeInterval);
        } else
        if (timer <= 0) {
            clearInterval(timeInterval);
            enterInitials(score);
            $("#timer").text(timer);
            
        }

    }, 1000);
}

//returns array of random index numbers to randomize question/choice order

function scrambleOrder(length) {
    var randomArray = [];
    while (randomArray.length < length) {
        var r = Math.floor(Math.random() * length);
        if (randomArray.includes(r) == false) {
            randomArray.push(r);
        }
    }
    return randomArray;
}

function enterInitials(score) {
    $("#score").text(score);
    $("#end-quiz").removeClass("hide");
    $("#submit").on("click", saveScore);
}

function saveScore() {
    var initials = $("#initials").val();
  
    if (initials !== "") {
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      var newScore = {
        score: score,
        initials: initials
      };

      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
      window.location.href = "highscores.html";
    }
  }