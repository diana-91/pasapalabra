function Question(letter, question, answer){
  this.letter = letter;
  this.question = question;
  this.answer = answer;
  this.isCorrectAnswer = false;
  // State 0 = No contestada, 1 = Fallo, 2 = Acierto
  this.state = 0;
}
