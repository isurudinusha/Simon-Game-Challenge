const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

/* This is the code that starts the game. */
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
    
  }
});

/**
 * If the game has started, then add a new random color to the game pattern, play the sound, and
 * increase the level.
 */
function nextSequence() {
  if (started) {
    userClickedPattern = [];
    const randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour)
      .fadeOut(50)
      .fadeIn(50);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

/* This is the code that is executed when a user clicks on a button. */
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  animatePress(userChosenColour);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

/**
 * When the user clicks on a button, the button will be highlighted for 100 milliseconds.
 * @param currentColour - The colour that is currently being played.
 */
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

/**
 * If the user has clicked the correct button, then check that they have finished their sequence with
 * another if statement. If the user got the most recent answer right in step 3, then call
 * nextSequence() after a 1000 millisecond delay.
 * 
 * If the user got the most recent answer wrong, then call playSound("wrong") and animate the body of
 * the website with the game-over class. Also, reset the variables level, gamePattern and started to 0,
 * an empty array and false respectively. Finally, display a message to let the user know that the game
 * has ended.
 * @param currentLevel - The current level of the game.
 */
function checkAnswer(currentLevel) {
  if (started) {
    if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
      if (currentLevel + 1 == level) {
        setTimeout(() => {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      gamePattern = [];
      userClickedPattern = [];
      started = false;
      level = 0;
      $("#level-title").append(
        "</br> </br> Game Over, Press Any Key to Restart"
      );
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);
    }
  }
}
