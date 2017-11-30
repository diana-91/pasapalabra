window.onload = function(){
  var b = new Board();

  document.getElementById('start-game').onclick = function() {
    b.startGame();
  };
}


function Board(){
  this.questions = [];
}

prototype.find(lettra) {

}

/* Función */
Board.prototype.startGame = function (){

  var quest = new Question('A','Animal de cuatro patas','Antilope');
    countLetters = quest.count;

  this.questions.push(quest)
  quest.showQuestions();
}
