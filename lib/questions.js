function Question(letter,quest,answer){
  this.letter = letter;
  this.quest = quest;
  this.answer = answer;
  this.count = 25;
}

/*
Función que muestra las preguntas
*/
Question.prototype.showQuestions = function(){
  alert(this.quest);
  document.getElementsByTagName("span")[0].innerText = 'dadd';
}

/*
Función que comprueba las respuestas dadas por el usuario.
*/
Question.prototype.checkAnswer = function(){

}
