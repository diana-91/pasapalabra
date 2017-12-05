$(document).ready(function(){
  var myBoard = new Board();
  this.inputParam = $('#input-answer').value;

  //Empieza el juego
  //one --> solamente lo ejecuta una vez
  $('#start-game').one('click', function(){
    myBoard.startGame();
  });

  $('#check-question').on('click',function checkAnswer() {
    console.log(this.inputParam);
    myBoard.checkAnswer($('#input-answer').value);
    //reset input value
  });

  $('#next-question').on('click',function nextLetter () {
    myBoard.actualQuestion++
    myBoard.nextQuestion();
  });
});
