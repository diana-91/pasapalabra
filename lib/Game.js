$(document).ready(function(){
  var myBoard = new Board();

  //Empieza el juego
  //one --> solamente lo ejecuta una vez
  $('#start-game').one('click', function(){
    myBoard.startGame();
  });

  $('#check-question').on('click',function checkAnswer() {
    myBoard.checkAnswer($('#input-answer').val());
    //reset input value
  });

  $('#next-question').on('click',function nextLetter () {
    myBoard.actualQuestion++
    myBoard.nextQuestion();
  });
});
