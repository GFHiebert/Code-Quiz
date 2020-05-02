
var timer = 75;
var questionIndex = 0;
var questionRandomArray = [];


$(".choice-button").on("click", function() {
    console.log("Choice chosen");
    displayNextQuestion();
})

// Listeners
$("#start-button").on("click", function() {
    console.log("Button clicked");
    $("#intro").attr("class", "hide");
    // $("#intro").removeChild("<h2>");
    questionRandomArray = scrambleOrder(questions.length);
    displayNextQuestion();
})

//Show questions and choices
function displayNextQuestion(){
    $("#questions").empty();
    $("#questions").removeClass("hide");
    
    $("#question").text(questions[questionRandomArray[questionIndex]].title);
    var choiceLength = questions[questionRandomArray[questionIndex]].choices.length;
    var choiceRandomArray = scrambleOrder(choiceLength);

    var questionEl = $("<h2>");
    questionEl.text(questions[questionRandomArray[questionIndex]].title);
    $("#questions").append(questionEl);

    for(var i = 0; i < choiceLength; i++) {
        var choiceEl = $("<button>");
        choiceEl.addClass("choice-button");
        choiceEl.text(questions[questionRandomArray[questionIndex]].choices[choiceRandomArray[i]]);
        $("#questions").append(choiceEl);
    }
    //$("#questions").append($("<button>").attr("id","the-one-button").text("The One Button"));

    $(".choice-button").on("click", function() {
        console.log("Choice chosen");
        if($(this).text() == (questions[questionRandomArray[questionIndex]].answer)) {
            console.log("Correct")
            console.log($(this).text() + " = " + (questions[questionRandomArray[questionIndex]].answer));
            console.log(questionIndex);
        } else {
            console.log("Wrong")
            console.log($(this).text() + " != " + (questions[questionRandomArray[questionIndex]].answer));
            console.log(questionIndex);
            timer =- 10;
        }

        if(questions.length > questionIndex + 1) {
            questionIndex ++;
        displayNextQuestion();
        } else {
            $("#questions").empty();

        }

        
    })

    
}

//returns array of random index numbers to randomize question/choice order

function scrambleOrder(length) {
    var randomArray = [];
    while(randomArray.length < length) {
        var r = Math.floor(Math.random() * length);
        if(randomArray.includes(r) == false)  {
            randomArray.push(r);
            //console.log(r + " was added")
        }
    } //console.log("finished populating randomArray"); 
    //console.log(randomArray);
    return randomArray;
    
    
        
    
}
