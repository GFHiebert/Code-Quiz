function printHighscores() {
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      var liTag = $("<li>").text(score.initials + "    :    " + score.score);
      
      $("#highscores").append(liTag);

    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  $("#clear-highscores").on("click", clearHighscores);

  printHighscores();