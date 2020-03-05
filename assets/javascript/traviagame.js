$(document).ready(function(){

  //Using constructor to store database from Open Trivia database
  function open_trivia_db(triviaQuiz, triviaChoice=[], triviaAns, rightAns, category, difficulty){
  // function open_trivia_db(triviaQuiz, triviaChoice=[], triviaAns, rightAns, category, difficulty){
    this.triviaQuiz = triviaQuiz;
    this.triviaChoice = triviaChoice;
    this.triviaAns = triviaAns;
    this.rightAns = rightAns;
    this.category = category;
    this.difficulty = difficulty;
  }
  //End of Constructor         
    var triviaQandA = [];
    var triviaQuiz = "";
    var triviaChoice = [];
    var triviaAns = 0;
    var rightAns = "";
    var category = "";
    var difficulty = "";
   
    var count = 0;
    var time = 15;
    var interVal;
    var correctAns = 0;
    var missedAns = 0;
    var arr=[];
    var opt = ""

    $("#ease").change(function() {
      opt = $(this).children("option:selected").val();
      switch (opt) {
        case "general knowledge":          
          var queryURL = "https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple&encode=url3986";
          gameOption(queryURL);
          break;
        case "film":
          var queryURL = "https://opentdb.com/api.php?amount=20&category=11&difficulty=easy&type=multiple&encode=url3986";
          gameOption(queryURL);
          break;
        case "music":
          var queryURL = "https://opentdb.com/api.php?amount=20&category=12&difficulty=easy&type=multiple&encode=url3986";
          gameOption(queryURL);
          break;
        case "television":
          var queryURL = "https://opentdb.com/api.php?amount=20&category=14&difficulty=easy&type=multiple&encode=url3986";
          gameOption(queryURL);
          break;
        case "video game":
          var queryURL = "https://opentdb.com/api.php?amount=20&category=15&difficulty=easy&type=multiple&encode=url3986";
          gameOption(queryURL);
          break;
        case "board game":
          var queryURL = "https://opentdb.com/api.php?amount=20&category=16&difficulty=easy&type=multiple&encode=url3986";
          gameOption(queryURL);
          break;
        case "computer":
          var queryURL = "https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple&encode=url3986";
          gameOption(queryURL);
          break;
        case "history":
          var queryURL = "https://opentdb.com/api.php?amount=20&category=23&difficulty=easy&type=multiple&encode=url3986";
          gameOption(queryURL);
          break;
        case "mythology":
          var queryURL = "https://opentdb.com/api.php?amount=10&category=20&difficulty=easy&type=multiple&encode=url3986";
          gameOption(queryURL);
          break;
      }      
  });
      
        // var queryURL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple&encode=url3986";


//Function Trivia Game option
function gameOption(queryURL){
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {            
      data = response.results;
      initQuiz(data);  
      // console.log(triviaQandA)    
      startTimer();
      dispQuiz(count);
    });
}




//Action
$(document).on("click",".ansBtn", function () {
  var selectValue=$(this).val(); 
  console.log(triviaQandA[count-1].rightAns + ' : ' + selectValue);
  // console.log(selectValue);

if (selectValue === triviaQandA[count-1].rightAns){
// console.log("click" + count);
correctAns++
time = 15;
console.log(count);
// if (count >= triviaQandA.length){stopGame()};

dispQuiz(count);
}else{
// console.log("click else" + count);
missedAns++;
time = 15;
console.log(count);
// if (count >= triviaQandA.length){stopGame()}
dispQuiz(count);
}
});
//Action
          
//Function to store Trivia Q&A into constructor
    function initQuiz(data){
      for (let i = 0; i < data.length; i++) {
        triviaChoice = [];          
        triviaQuiz = (decodeURIComponent(data[i].question)); 
        category = (decodeURIComponent(data[i].category));
        difficulty = decodeURIComponent(data[i].difficulty);
        rightAns = (decodeURIComponent(data[i].correct_answer));
        for (let j = 0; j < data[i].incorrect_answers.length; j++) {
          triviaChoice[j] = (decodeURIComponent(data[i].incorrect_answers[j])); 
        } 
        triviaChoice.push(rightAns);
        //Rearrange triviaChoice
        shuffleArray(triviaChoice);
        // console.log(triviaChoice)
        for (let l = 0; l < triviaChoice.length; l++){
          if(triviaChoice[l] == rightAns){
            triviaAns = l;
          }
        }
        triviaQandA[i] = new open_trivia_db(triviaQuiz, triviaChoice, triviaAns, rightAns, category, difficulty);               
      
      }
    
    }       

        
//Function to display trivia quiz
function dispQuiz(iter) {
  if (count < triviaQandA.length){
    $("#Quiz").text(triviaQandA[iter].triviaQuiz);
    $('#Choice').empty();
    for (let i = 0; i < 4; i++){
      var answer = triviaQandA[iter].triviaChoice[i];
      $('#Choice').append('<p><input class="ansBtn" type="radio" check="uncheck" name="Option'+iter+'" value="'+answer+'">' + '   '  + answer +'</p>');
    }   
    count++;    
  } else {stopGame()} 
}
          
        
//Function to shuffle array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

//Function start timer
function startTimer(){

  clearInterval(interVal);
  interVal = setInterval(function () {
    if(time>0){
    time--;
   var convertedTime=timeConverter(time);
    // var time=document.getElementById("timer")
    quiztimer = $(".timer");
    quiztimer.css("background-image", " url('./assets/images/vegas.gif')");
    quiztimer.css("color", "white").css("border","1px solid black").css("border-radius","10px")
    quiztimer.text(convertedTime);
   }
   else{
       time = 15;
       dispQuiz(count);
      //  console.log(time)
        // location.reload();
        }
  },1000 )
  }

//Fiunction End of Game
function stopGame(){
  console.log("Stop Game!!!")
  clearInterval(interVal);
  count = 0;
  // $("#Quiz").text("");
  // $("#Choice").text("");
  $(".timer").text("Well done!!!");
  $("#Quiz").text("Correct Answer: " + correctAns).css("color","#f0f0f0");
  $("#Choice").text("Missed Answer: " + missedAns).css("color","#f0f0f0");;
}


//Function to convert time
function timeConverter(t) {

  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0) {
    minutes = "00";
  }
  else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;
}

//End
})