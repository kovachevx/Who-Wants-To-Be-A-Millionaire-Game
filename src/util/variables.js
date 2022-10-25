import SoundFrom100To1000 from "./sounds/soundQuestionFrom100To1000.mp3";
import SoundFrom1000To50000 from "./sounds/soundQuestionFrom1000To50000.mp3";
import Sound50000 from "./sounds/soundQuestion50000.mp3";
import Sound100000 from "./sounds/soundQuestion100000.mp3";
import MainTheme from "./sounds/main-theme.mp3"
import WrongAnswerSound from "./sounds/wrong-answer.mp3";
import CorrectAnswerSound from "./sounds/correct-answer.mp3";

const music = {
    SoundFrom100To1000,
    SoundFrom1000To50000,
    Sound50000,
    Sound100000,
    MainTheme,
    WrongAnswerSound,
    CorrectAnswerSound
}

const questions = [];

const sumStairway = [100, 200, 300, 400, 500, 1000, 1500, 2000, 3000, 5000, 10000, 20000, 30000, 50000, 100000];

const answerToLetterRef = ['A', 'B', 'C', 'D'];

const modalData = {
    firstCertainSum:
        { title: 'Congratulations!', body: `You've reached the certain sum of $500! You can't leave with any less than that.`, modalIsOpen: true, buttonText: 'Continue' },
    secondCertainSum:
        { title: 'Congratulations!', body: `You've reached the certain sum of $5000! You can't leave with any less than that.`, modalIsOpen: true, buttonText: 'Continue' },
    finalCertainSum:
        { title: 'Congratulations!', body: `You've reached the end of the game and won $100 000!`, modalIsOpen: true, buttonText: 'Play again?', },
    gameOver:
        { title: 'Oops, that\'s the wrong answer!', modalIsOpen: true, buttonText: 'Play again' },
    callAFriend:
        { title: 'Your friend says:', modalIsOpen: true, buttonText: 'Continue' },
    askTheAudience:
        { title: 'Audience Vote:', modalIsOpen: true, buttonText: 'Continue' },
    exitGame:
        { title: 'Exit Game?', modalIsOpen: true, buttonText: 'Quit', resumeButtonText: 'Resume', resumeColor: 'success' }
}

const quotes = [
    "I think the correct answer is",
    "I'm pretty sure that it's",
    "I'm not sure, but it could be",
    "I believe the correct answer is",
];

export {
    questions,
    sumStairway,
    answerToLetterRef,
    modalData,
    quotes,
    music
};