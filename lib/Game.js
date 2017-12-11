$(document).ready(function(){
  var myBoard = new Board();

  //Empieza el juego
  //one --> solamente lo ejecuta una vez
  $('.start-game').on('click', function(){
    myBoard.startGame();
  });

  $('#check-question').on('click',function checkAnswer() {
    myBoard.checkAnswer($('#input-answer').val());

  });

  $('#next-question').on('click',function nextLetter () {
    myBoard.nextQuestion();
  });

  $(document).keypress(function(){
    if(event.which ===13){
      myBoard.checkAnswer($('#input-answer').val());
    }

  });

  $(document).keydown(function() {
    if(event.which === 39){
      myBoard.nextQuestion();
    }
  });
});
