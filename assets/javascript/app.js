$(document).ready(function() {

    //DOM manipulation code

var triviaQandA =[{
    triviaQuestion: "In Star Trek, which of the following Klingons became the first Klingon emperor unifying the Klingon people?", 
    triviaChoice:["Martok son of Urthog", "Gowron son of M'Rel", "Worf son of Mogh", "Kahless the Unforgettable"], 
    triviaAns:3},
    {triviaQuestion:"What classic rock group scored hits with the songs 'Feels Like the First Time', 'Hot Blooded' and 'Cold as Ice'?", 
    triviaChoice:["Foreigner", "Styx", "Journey", "Cheap Trick"], 
    triviaAns:0},
    {triviaQuestion:"In the English comic strip Andy Capp, who are Andy Capp's best friends and neighbors?", 
    triviaChoice:["The Whites", "The Richardson's", "The O'Connor's", "The Smiths"], 
    triviaAns:0},
    {triviaQuestion:"Making its debut in 1986, what legal drama TV series starred the likes of 'Harry Hamlin' and 'Richard Dysart'?", 
    triviaChoice:["Boston Legal", "The Practice", "LA Law", "Law and Order"], 
    triviaAns:2},
    {triviaQuestion:"As of 2018, which of the following US states has never had a Miss America winner? ",
    triviaChoice:["Oklahoma", "Alaska", "New York", "Michigan"],  
    triviaAns: 1},
    {triviaQuestion:"In which of the Rocky movies did Hulk Hogan have a part?", 
    triviaChoice:["Rocky III", "Rocky II", "Rocky IV", "Rocky"], 
    triviaAns: 2},
    {triviaQuestion:"Arguably, the best-known video game character, Mario first appeared in what 1981 video game?", 
    triviaChoice:["Mario Bros.", "Donkey Kong", "Pitfall", "Pac-Man"], 
    triviaAns:1},
    {triviaQuestion:"Sean Connery, Roger Moore, George Lazenby, Timothy Dalton and Pierce Brosnan have all played this role.", 
    triviaChoice:["Batman", "Tarzan", "Superman", "James Bond"], 
    triviaAns:3},
    {triviaQuestion:"These comic book superheroes were trained in 'Professor Xavier's School for Gifted Youngsters'.", 
    triviaChoice:["Justice League", "The X-Men", "The Avengers", "The Fantastic Four"], 
    triviaAns:1},
    {triviaQuestion:"Based on an Anthony Burgess's novel, what film stars Malcolm McDowell as Alex DeLarge?",
    triviaChoice:["Straw Dogs", "Children of Men", "Dr. Strangelove", "A Clockwork Orange"], 
    triviaAns:3},
    {triviaQuestion:"What was the name of the school Harry Potter was to attend before he got his letter from Hogwarts?", 
    triviaChoice:["Muggle High", "Stonewall High", "St. Thomas High", "Stonebridge High"], 
    triviaAns: 3},
    {triviaQuestion:"What artist holds the record for most Grammy nominations in one night without winning at nine?", 
    triviaChoice:["Stevie Wonder", "Kanye West", "Rihanna", "Paul McCartney"], 
    triviaAns:3},
    {triviaQuestion:"Airing from February to May 2018, who was the winner of 'Survivor - Ghost Island' (36th season)?", 
    triviaChoice:["Ben Driebergen", "Wendell Holland", "Adam Klein", "Sarah Lacina"], 
    triviaAns:1},
    {triviaQuestion:"Toted as a great stress-reliever, what toy became popular in April of 2017?", 
    triviaChoice:["Stress Ball", "Spin Top", "Squishy Sponge", "Fidget Spinner"], 
    triviaAns:3},
    {triviaQuestion:"Released in October of 1983, name Cyndi Lauper's solo debut album.", 
    triviaChoice:["She's So Unusual", "At Last", "Cyndi Lauper", "True Colors"], 
    triviaAns:0
 
}]

// console.log(triviaQandA[0].triviaChoice[0]);
var currentQuiz =0;
var count = 0;
var time = 10;
var interVal;
var rightAns = 0;
var missedAns = 0;
var arr=[];




//Function to start Trivia Game
function startTimer(){

    clearInterval(interVal);
    interVal = setInterval(function () {
      if(time>0){
      time--;
     var convertedTime=timeConverter(time);
      // var time=document.getElementById("timer")
      $(".timer").text(convertedTime);
     }
     else{
         time = 10;
            placeQuiz(count);}
    },1000 )
    }

//Excuting StartTime
startTimer();






//Function to place trivia quiz
placeQuiz(count);
function placeQuiz(iter) {
       count++;   
    $("#triviaQuiz").text(triviaQandA[iter].triviaQuestion);
    $('#quizChoice').empty();
for (let i = 0; i < 4; i++){
    var answer = triviaQandA[iter].triviaChoice[i];
    $('#quizChoice').append('<p><input class="ansBtn" type="radio" check="uncheck" value="'+answer+'">' + '   '  + answer +'</p>');
    }   
    if (count > 15){
        stopGame()
    }
}

    
function stopGame(){
    clearInterval(interVal);
    $("#correctAns").text("You got " + rightAns + " questionsr right");
    $("#missedAns").text("You missed " + missedAns + " questions :(");
    $('#quizChoice').text("   ");
    $("#triviaQuiz").text("   ");
    $(".timer").text("Times Up!!!");
    
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

      $(document).on("click",".ansBtn", function () {
        var index=$(this).val();
        arr=triviaQandA.triviaChoice;
        var userIndex=triviaQandA[count-1].triviaChoice.indexOf(index);
        if (userIndex === triviaQandA[count-1].triviaAns){
            console.log("click" + count);
            rightAns++
            time = 10;
            placeQuiz(count);
        }else{
            // console.log("click else" + count);
            missedAns++;
            time = 10;
            placeQuiz(count);
        }
      });

    //   $(".ansBtn").click(function () {
    //     var index=$(this).val();
    //     arr=triviaQandA.triviaChoice;
    //     var userIndex=triviaQandA[count-1].triviaChoice.indexOf(index);
    //     if (userIndex === triviaQandA[count-1].triviaAns){
    //         rightAns++
    //         time = 10;
    //         placeQuiz(count);
    //     }else{
    //         missedAns++
    //         time = 10;
    //         placeQuiz(count);
    //     }
    // });




});