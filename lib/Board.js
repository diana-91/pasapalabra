function Board(){
  this.questions = [];
  this.actualQuestion = 0;
  this.countTime = 165;
  this.countCorrectQuestion = 0;
  this.countIncorrectQuestion = 0;

}


Board.prototype.startGame = function (){

  this.startCountdown();

  document.interval = setInterval(this.subtractTime,1000);

  this.createQuestions();

  this.createBoard();

  this.firstQuestion();

}

 Board.prototype.subtractTime = function(time,correct){
  time=document.getElementById('i-time').textContent;
  time --;
  document.getElementById('i-time').textContent = time;

  if(time === 0){
    clearInterval(document.interval);
    document.getElementById('quest-answ').style.display = 'none';
    document.getElementById('end-game').style.display = 'block';
    document.getElementById('correct-answers').textContent=document.getElementById('i-correctQ').textContent;
    setTimeout(location.reload(false),5000);
  }
}
/*
  Funcion que pinta el tiempo
*/
Board.prototype.startCountdown = function(){
  var circleTime = document.createElement("div");
  circleTime.setAttribute("class","c-time");
  circleTime.setAttribute("id","i-time");
  circleTime.appendChild(document.createTextNode(this.countTime));
  document.getElementById('show-board').appendChild(circleTime);
}

/*
  Función que dibuja el rosco dinamicamente (DOM) y las preguntas correctas
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

  //crear el panel donde insertamos las respuestas acertadas
  var correctQuestion = document.createElement("div");
  correctQuestion.setAttribute("class","c-correctQ");
  correctQuestion.setAttribute("id","i-correctQ");
  correctQuestion.appendChild(document.createTextNode(0));

  document.getElementById('show-board').appendChild(correctQuestion);

  document.getElementById('description').style.display = 'none';
  document.getElementById('quest-answ').style.display = 'block';

}

/*
Pinta el borde de la letra A
*/
Board.prototype.paintBorderLetterA = function(){
  document.getElementById('lettersA').style.borderColor = '#FFC300';
}

/*
Función de crear las preguntas
*/
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
        actualLetter.style.borderColor = '#FFFFFF';
          document.getElementById('lettersA').style.borderColor = 'rgb(255, 195, 0)';
          this.actualQuestion = 0;
          if(this.questions[this.actualQuestion].state!==0){
            this.nextQuestion();
          }
      }else{
        actualLetter.style.borderColor = '#FFFFFF';
        actualLetter.nextSibling.style.borderColor = 'rgb(255, 195, 0)';
        this.actualQuestion++;
        if(this.questions[this.actualQuestion].state!==0){
          this.nextQuestion();
        }
     }
     document.getElementById('question').innerText = this.questions[this.actualQuestion].question;
     document.getElementById('input-answer').value = '';
     document.getElementById("input-answer").focus();

}
/*
Función que muestra la pregunta
*/
Board.prototype.drawOneQuestion = function(question) {
  // Pinto la pregunta del parámetro (question)
  document.getElementById('question').textContent = question;
}

Board.prototype.checkAnswer = function(input) {
  input = this.transformToLowerCase(input);

  var actualLetter = document.getElementById('letters'+this.questions[this.actualQuestion].letter);
  if(input === this.questions[this.actualQuestion].answer ){

    this.questions[this.actualQuestion].state = 2;
    // Pintar de verde
    actualLetter.style.backgroundImage = 'radial-gradient(circle, #28B463, #1E8449)';
    this.paintCorrectQuestion(this.countCorrectQuestion += 1);
  } else {
    this.questions[this.actualQuestion].state = 1;
    this.countIncorrectQuestion += 1;
    // Pintar de coloretes rojos el borde de la letra
    actualLetter.style.backgroundImage = 'radial-gradient(circle, #C0392B, #922B21)';
  }

  if(this.countIncorrectQuestion+this.countCorrectQuestion === 27){
    clearInterval(document.interval);
    document.getElementById('quest-answ').style.display = 'none';
    document.getElementById('end-game').style.display = 'block';
    document.getElementById('correct-answers').textContent=document.getElementById('i-correctQ').textContent;
    setTimeout(location.reload(false),5000);
  }else{
    this.nextQuestion();
  }
}

Board.prototype.paintCorrectQuestion = function(question){
  document.getElementById("i-correctQ").textContent = question;

}

Board.prototype.transformToLowerCase = function(input) {
  // Metodo para lower case
  return input.toLowerCase();
}

Board.prototype.firstQuestion = function(){
  document.getElementById('lettersA').style.borderColor = '#FFC300';
  this.drawOneQuestion(this.questions[this.actualQuestion].question);
  document.getElementById("input-answer").focus();
}
