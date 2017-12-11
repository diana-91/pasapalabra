function Board(){
  this.questions = [];
  this.actualQuestion = 0;
  this.countTime = 10;
  this.countCorrectQuestion = 0;
}


Board.prototype.startGame = function (){

  setInterval(this.subtractTime(),1000);

  //this.subtractTime();

  this.paintCorrectQuestion(this.countCorrectQuestion);

  this.createQuestions();

  this.createBoard();

  this.firstQuestion();

}

Board.prototype.subtractTime = function(){
  //var time = setInterval('this.subtractTime()',1000);
  var circleTime = document.createElement("div");
  circleTime.setAttribute("class","c-time");
  circleTime.setAttribute("id","i-time");

  document.getElementById('show-board').appendChild(circleTime);
  circleTime.appendChild(document.createTextNode(this.countTime --));
  alert(this.countTime-=1);

  if(this.countTime === 0){
    alert('FIN DEL JUEGO');
    document.getElementById('end-game').style.display = 'block';
    clearInterval(this.countTime);
  }
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


  document.getElementById('description').style.display = 'none';
  document.getElementById('quest-answ').style.display = 'block';

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
}

Board.prototype.drawOneQuestion = function(question) {
  // Pinto la pregunta del parámetro (question)
  document.getElementById('question').innerText = question;
}

Board.prototype.checkAnswer = function(input) {
  alert(input);
  this.transformToLowerCase(input);

  var actualLetter = document.getElementById('letters'+this.questions[this.actualQuestion].letter);
  if(input === this.questions[this.actualQuestion].answer ){

    this.questions[this.actualQuestion].state = 2;
    // Pintar de verde
    actualLetter.style.backgroundImage = 'radial-gradient(circle, #28B463, #1E8449)';
    alert('antes de llamar a la función'+this.countCorrectQuestion);
    this.paintCorrectQuestion(this.countCorrectQuestion += 1);
  } else {
    this.questions[this.actualQuestion].state = 1;
    // Pintar de coloretes rojos el borde de la letra
    actualLetter.style.backgroundImage = 'radial-gradient(circle, #C0392B, #922B21)';
  }
  this.nextQuestion();
}

Board.prototype.paintCorrectQuestion = function(question){
  alert('dentro de la funcion'+question);
  var correctQuestion = document.createElement("div");
  correctQuestion.setAttribute("class","c-correctQ");
  correctQuestion.setAttribute("id","i-correctQ");
  correctQuestion.appendChild(document.createTextNode(question));
  document.getElementById('show-board').appendChild(correctQuestion);

}

Board.prototype.transformToLowerCase = function(input) {
  // Metodo para lower case
  return alert(input.toLowerCase());
}

Board.prototype.firstQuestion = function(){
  document.getElementById('lettersA').style.borderColor = '#FFC300';
  this.drawOneQuestion(this.questions[this.actualQuestion].question);
}
