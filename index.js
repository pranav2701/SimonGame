
var gamePattern = [];
var userClickedPattern = [];
var btnColors = ["red","blue","green","yellow"];

var start = false;
var level = 0;

$(document).keypress(function(){
  if(!start){
    $("h1").text("Level "+level);
    nextSequence();
    start = true;
  }
});


$(".btn").click(function(){
  var userChosenColor = $(this).attr("id") ;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animate(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over.Press any key to Restart.");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = btnColors[randomNumber];
  gamePattern.push(randomColor);

  $("#"+randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function animate(currentColor){
  // $("#"+currentColor).fadeOut(100).fadeIn(100);
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  start = false;
}
