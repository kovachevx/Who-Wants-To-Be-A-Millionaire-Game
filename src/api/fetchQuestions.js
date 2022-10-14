import populateQuestions from "./populateQuestions.js";

async function fetchQuestionsByDifficulty(difficulty) {
    const url = `https://opentdb.com/api.php?amount=5&difficulty=${difficulty}&type=multiple`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        populateQuestions(data.results);
    } catch (error) {
        return console.log(error);
    }
};

export default fetchQuestionsByDifficulty;