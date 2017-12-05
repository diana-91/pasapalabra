function Question(letter, question, answer){
  this.letter = letter;
  this.question = question;
  this.answer = answer;
  this.isCorrectAnswer = false;
  // State 0 = No contestada, 1 = Fallo, 2 = Acierto
  this.state = 0;
}

/*
Función que muestra las preguntas
*/
Question.prototype.showQuestions = function(){

  // document.getElementsByTagName("span")[0].innerText = 'dadd';
}

/*
Función que comprueba las respuestas dadas por el usuario.
*/
Question.prototype.checkAnswer = function(){

}
