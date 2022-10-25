import classes from './App.module.css';
import { Fragment, useEffect, useState } from 'react';
import { questions as quiz, quotes, modalData, sumStairway, music } from './util/variables';
import fetchQuestionsByDifficulty from './api/fetchQuestions';
import QuestionAndAnswers from './components/QuestionAndAnswers';
import SumStairway from './components/SumStairway';
import DynamicModal from './components/DynamicModal';
import Hints from './components/Hints';
import Intro from './components/Intro';
import Music from 'react-howler';
import { Howl } from 'howler';

function App() {
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [sumProps, setSumProps] = useState({ currentSumIndex: 0, certainSum: 0 });
  const [modalProps, setModalProps] = useState({});
  const [theme, setTheme] = useState(music.SoundFrom100To1000);
  const [isPlaying, setIsPlaying] = useState(true);

  const startGameHandler = () => setGameHasStarted(true);

  const toggleModalHandler = () => setModalProps(previousState => {
    return { ...previousState, modalIsOpen: false }
  });

  useEffect(() => {
    if (!gameHasStarted && questions.length === 0) {
      fetchAllQuestions();
    }
  }, []);

  async function fetchAllQuestions() {
    await fetchQuestionsByDifficulty('easy');
    await fetchQuestionsByDifficulty('medium');
    await fetchQuestionsByDifficulty('hard');
    setQuestions(quiz);
  }

  function nextQuestionHandler() {
    setTimeout(() => {
      setQuestions(previousState => {
        previousState.shift();
        return [...previousState];
      });
    }, 500);
  }

  const refreshPage = () => window.location.reload();

  const exitGameHandler = () => {
    setModalProps({ ...modalData.exitGame, body: `Are you sure you want to quit? You're about leave with $${sumStairway[sumProps.currentSumIndex - 1] === undefined ? 0 : sumStairway[sumProps.currentSumIndex - 1]}`, action: refreshPage, onResumeGame: toggleModalHandler });
  }

  const buttonColorChangeHandler = (markedAnswer, newColor) => {
    questions[0].answers.forEach(answer => {
      if (answer.answerText === markedAnswer) answer.color = newColor;
      setTimeout(() => {
        if (answer.answerText === questions[0].correct_answer) answer.color = 'success';
      }, 1000);
      answer.disabled = true;
    });
    setQuestions(previousState => [...previousState]);
  }

  useEffect(() => {
    if (sumProps.currentSumIndex === 0) {
      setTheme(music.SoundFrom100To1000);
    } else if (sumProps.currentSumIndex === 5) {
      setTheme(music.SoundFrom1000To50000);
    } else if (sumProps.currentSumIndex === 13) {
      setTheme(music.Sound50000);
    } else if (sumProps.currentSumIndex === 14) {
      setTheme(music.Sound100000);
    } else if (sumProps.currentSumIndex === 15) {
      setTheme(music.MainTheme);
    }
  }, [sumProps.currentSumIndex]);

  const playSoundEffect = (src) => {
    const sound = new Howl({
      src,
      html5: true,
      volume: 0.5
    });
    sound.play();
  }

  const checkAnswerHandler = (event) => {
    let markedAnswer;
    if (event.target.localName === 'span') markedAnswer = event.target.parentElement.firstChild.nextSibling.textContent;
    else markedAnswer = event.target.textContent.slice(3);

    buttonColorChangeHandler(markedAnswer, 'warning');

    setTimeout(() => {
      if (markedAnswer === questions[0].correct_answer) {
        buttonColorChangeHandler(markedAnswer, 'success');
        playSoundEffect(music.CorrectAnswerSound);

        setSumProps(previousState => {
          sumProps.currentSumIndex++;
          return { ...previousState }
        });

        if (sumProps.currentSumIndex === 4) {
          setSumProps(previousState => { return { ...previousState, certainSum: 500 } });
          setModalProps({ ...modalData.firstCertainSum, modalIsOpen: true, action: toggleModalHandler });
        } else if (sumProps.currentSumIndex === 9) {
          setSumProps(previousState => { return { ...previousState, certainSum: 5000 } });
          setModalProps({ ...modalData.secondCertainSum, action: toggleModalHandler });
        } else if (sumProps.currentSumIndex === 14) {
          setSumProps(previousState => { return { ...previousState, certainSum: 100000 } });
          setModalProps({ ...modalData.finalCertainSum, action: refreshPage });
        }

        nextQuestionHandler();
      } else {
        setIsPlaying(false);
        playSoundEffect(music.WrongAnswerSound);
        buttonColorChangeHandler(markedAnswer, 'danger');
        setModalProps({ ...modalData.gameOver, body: `You are leaving with $${sumProps.certainSum}!`, action: refreshPage });
      }
    }, 1000);
  }

  const fiftyFiftyHandler = (event) => {
    event.target.disabled = true;
    const currentQuestion = questions[0];
    let counter = 0;

    while (counter < 2) {
      const randomIndex = Math.floor(Math.random() * 3);
      const correctAnswerIndex = currentQuestion.answers.findIndex(answer =>
        answer.answerText === currentQuestion.correct_answer);

      if (randomIndex !== correctAnswerIndex && !currentQuestion.answers[randomIndex].disabled) {
        currentQuestion.answers[randomIndex].answerText = "";
        currentQuestion.answers[randomIndex].disabled = true;
        setQuestions(previousState => [...previousState]);
        counter++;
      }
    }
  }

  const audienceHandler = (event) => {
    if (event.target.localName === 'button') event.target.disabled = true;
    else event.target.parentElement.disabled = true;

    const currentQuestion = questions[0];
    const presentIndices = currentQuestion.answers.map((answer, index) => answer.answerText !== "" ? index : null).filter(i => i !== null);

    for (let i = 0; i < 50; i++) {
      const randomIndex = presentIndices[Math.floor(Math.random() * presentIndices.length)];
      currentQuestion.answers[randomIndex].votePercentage += 1;
    }

    setModalProps({ ...modalData.askTheAudience, body: currentQuestion.answers.map(answer => answer.votePercentage), action: toggleModalHandler });
  }

  const callAFriendHandler = (event) => {
    if (event.target.localName === 'button') event.target.disabled = true;
    else event.target.parentElement.disabled = true;

    const currentQuestion = questions[0];

    const odds = Math.random();
    const randomQuoteIndex = Math.floor(Math.random() * quotes.length);

    const correctAnswer = currentQuestion.answers.find(answer => answer.isCorrect);
    const presentIndices = currentQuestion.answers.map((answer, index) => answer.answerText !== "" ? index : null).filter(i => i !== null);
    const randomGuessIndex = presentIndices[Math.floor(Math.random() * presentIndices.length)];
    const wildGuess = currentQuestion.answers[randomGuessIndex];

    if (odds < 0.6) {
      setModalProps({ ...modalData.callAFriend, body: `${quotes[randomQuoteIndex]} ${correctAnswer.letter}.`, action: toggleModalHandler });
    } else if (odds >= 0.6 && odds <= 0.9) {
      setModalProps({ ...modalData.callAFriend, body: `${quotes[randomQuoteIndex]} ${wildGuess.letter}.`, action: toggleModalHandler });
    } else {
      setModalProps({ ...modalData.callAFriend, body: `I'm sorry, I don't really know the answer!`, action: toggleModalHandler });
    }
  }

  return (
    <div className={classes.mainContainer}>
      {!gameHasStarted && <Intro startGame={startGameHandler} />}
      {gameHasStarted &&
        <Fragment>
          <div className="mg col-10">
            <Hints onFiftyFifty={fiftyFiftyHandler} onAskTheAudience={audienceHandler} onCallAFriend={callAFriendHandler} questionData={questions} />
            < QuestionAndAnswers onCheck={checkAnswerHandler} questionData={questions[0]} />
          </div>
          <SumStairway onExit={exitGameHandler} questionIndex={sumProps.currentSumIndex} certainSum={sumProps.certainSum} />
          <DynamicModal isOpen={modalProps.modalIsOpen} toggleModal={toggleModalHandler} modalProps={modalProps} />
          <Music loop={true} src={theme} playing={isPlaying} volume={0.4} />
        </Fragment>}
    </div>
  );
}

export default App;