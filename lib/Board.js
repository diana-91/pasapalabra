function Board(){
  this.questions = [];
  this.actualQuestion = 0;
  this.countTime = 195;
}


Board.prototype.startGame = function (){

  this.countTime --;

  this.createQuestions();

  this.createBoard();

  //this.paintBorderLetterA();

  this.firstQuestion();

  //this.nextQuestion();

}

/*
  Función que dibuja el rosco dinamicamente (DOM)
*/
Board.prototype.createBoard = function(){
  var circleBoard = document.createElement("div");
  circleBoard.setAttribute('class','ls-board');
  circleBoard.setAttribute('id','letters-board');

  for(var i = 0; i < this.questions.length; i++){
      var circleLetter = document.createElement("div");
      circleLetter.setAttribute('class','l-questions');
      circleLetter.setAttribute('id','letters'+ this.questions[i].letter);

      //añadir el texto dentro de cada letra
      circleLetter.appendChild(document.createTextNode(this.questions[i].letter));

      //añadir el div de las letras dentro del div que crea el tablero de las letras
      circleBoard.appendChild(circleLetter);

  }

  // añadir el div que dibuja el tablero de las letras
  document.getElementById('show-board').appendChild(circleBoard);

  document.getElementById('input-answer').style.display = 'block';

}

Board.prototype.paintBorderLetterA = function(){
  document.getElementById('lettersA').style.borderColor = '#FFC300';
}

Board.prototype.createQuestions = function() {
  for (var i = 0; i < questionDB.length; i++) {
    var letter = questionDB[i].letter;
    var question = questionDB[i].question;
    var answer = questionDB[i].answer;
    this.questions.push(new Question(letter, question, answer))
  }
}

Board.prototype.nextQuestion = function() {

    var actualLetter = document.getElementById('letters'+this.questions[this.actualQuestion].letter);
      if(this.questions[this.actualQuestion].letter == 'Z'){
        actualLetter.style.borderColor = '#3498DB';
          document.getElementById('lettersA').style.borderColor = 'rgb(255, 195, 0)';
          this.actualQuestion = 0;
          if(this.questions[this.actualQuestion].state!==0){
            this.nextQuestion();
          }
      }else{
        actualLetter.style.borderColor = '#3498DB';
        actualLetter.nextSibling.style.borderColor = 'rgb(255, 195, 0)';
        this.actualQuestion++;
        if(this.questions[this.actualQuestion].state!==0){
          this.nextQuestion();
        }
     }
     document.getElementById('question').innerText = this.questions[this.actualQuestion].question;
     document.getElementById('input-answer').value = '';
}

Board.prototype.drawOneQuestion = function(question) {
  // Pinto la pregunta del parámetro (question)
  document.getElementById('question').innerText = question;
}

Board.prototype.checkAnswer = function(input) {
  this.transformToLowerCase(input);

  var actualLetter = document.getElementById('letters'+this.questions[this.actualQuestion].letter);
  if(input === this.questions[this.actualQuestion].answer ){

    this.questions[this.actualQuestion].state = 2;
    // Pintar de verde
    actualLetter.style.backgroundColor = '#28B463';
  } else {
    this.questions[this.actualQuestion].state = 1;
    // Pintar de coloretes rojos el borde de la letra
    actualLetter.style.backgroundColor = '#C0392B';

  }
  this.nextQuestion();
}

Board.prototype.transformToLowerCase = function(input) {
  // Metodo para lower case
  return input.toLowerCase();
}

Board.prototype.firstQuestion = function(){
  document.getElementById('lettersA').style.borderColor = '#FFC300';
  this.drawOneQuestion(this.questions[this.actualQuestion].question);
}
