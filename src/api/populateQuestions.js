import { questions, answerToLetterRef } from "../util/variables";

const dummyElement = document.createElement('span');

const populateQuestions = (questionData) => {
  const transformedData = transformData(questionData);
  transformedData.forEach((question) => questions.push(question));
  console.log(questions);
};

const transformData = (data) => {
  return data.map((questionObject) => {
    let { question, correct_answer, incorrect_answers } = questionObject;

    dummyElement.innerHTML = question;
    question = dummyElement.textContent;

    dummyElement.innerHTML = correct_answer;
    correct_answer = dummyElement.textContent;

    incorrect_answers.forEach(answer => {
      let currentIncorrectAnswer = incorrect_answers.shift();
      dummyElement.innerHTML = currentIncorrectAnswer;
      currentIncorrectAnswer = dummyElement.textContent;
      incorrect_answers.push(currentIncorrectAnswer);
    });

    let answers = [];
    [...incorrect_answers, correct_answer].forEach(answer => {
      answers.push({
        answerText: answer,
        isCorrect: answer === correct_answer,
        disabled: false,
        votePercentage: answer !== correct_answer ? 0 : 50,
        color: 'secondary'
      });
    });

    answers.sort((a, b) => a['answerText'].localeCompare(b['answerText']));
    answers.forEach((answer, index) => answer.letter = answerToLetterRef[index]);

    return {
      question,
      correct_answer,
      answers,
    };
  });
};

export default populateQuestions;