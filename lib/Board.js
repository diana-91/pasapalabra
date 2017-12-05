function Board(){
  this.questions = [];
  this.actualQuestion = 0;
  this.countTime = 195;

}


Board.prototype.startGame = function (){

  this.countTime --;

  this.createQuestions();

  this.createBoard();

  this.paintBorderLetterA();

  this.nextQuestion();

}

/*
  Función que dibuja el rosco dinamicamente (DOM)
*/
Board.prototype.createBoard = function(){
  var circleBoard = document.createElement("div");
  circleBoard.setAttribute('class','ls-board');
  circleBoard.setAttribute('id','letters-board');

  for(var i = 0; i < this.questions.length; i++){

      //debugger;
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
  // document.getElementById('input-answer').value='';
  //debugger;

  // Coger elemento por ID y mostrar los datos
  if (this.actualQuestion === 0 && this.questions[0].state === 0) {
    // Pinto la pregunta en el front
    document.getElementById('question').innerText = this.questions[0].question;
    //console.log(this.questions[0].question);
    this.drawOneQuestion(this.questions[0].question);
  } else {

    if (this.questions[this.actualQuestion].state === 0) {
      // Pinto de nuevo la pregunta
      this.drawOneQuestion(this.questions[0].question);
    }

    document.getElementById('question').innerText = this.questions[this.actualQuestion].question;
  }
}

Board.prototype.clearInput = function(){
  if(document.getElementById('input-answer').value === 'null' || document.getElementById('input-answer').value !== ''){
    document.getElementById('input-answer').value = '';
  }
}

Board.prototype.drawOneQuestion = function(question) {
  // Capturo el div donde se pinta la pregunta
  // Pinto la pregunta del parámetro (question)
  document.getElementById('question').innerText = question;
  this.paintInputAnswer();

}

Board.prototype.paintInputAnswer = function(){
  var inputAnswer = document.createElement("input");
  inputAnswer.setAttribute('id','input-answer');
  document.getElementById('quest-answ').appendChild(inputAnswer);
}

Board.prototype.checkAnswer = function(input) {
  this.transformToLowerCase(input);
  console.log('input: '+input);
  console.log('array: ' +this.questions[this.actualQuestion].answer);

  if(input === this.questions[this.actualQuestion].answer && this.isCorrectAnswer){
    console.log('LetraCorrecta: '+this.isCorrectAnswer);
    console.log('Estado: '+this.state);
    console.log('Letra actual: '+ this.actualQuestion++);
    this.isCorrectAnswer = true;
    this.state = 2;
    this.actualQuestion++;
    // Pintar de verde
    this.questions[this.actualQuestion].style.backgroundColor = '#28B463';
    board.nextQuestion();
  } else {
    this.state = 1;
    this.actualQuestion++;
    board.nextQuestion();
    // Pintar de coloretes rojos el borde de la letra
    this.questions[this.actualQuestion].style.backgroundColor = '#C0392B';
  }



}

Board.prototype.transformToLowerCase = function(input) {
  // Metodo para lower case
  console.log(input);
  return input.toLowerCase();
}
