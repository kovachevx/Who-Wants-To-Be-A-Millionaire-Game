import classes from './QuestionAndAnswers.module.css';
import { answerToLetterRef } from '../util/variables';
import { Button } from 'reactstrap';

const QuestionAndAnswers = props => {

    return (
        <div className="mg col-12">
            <div className={classes.QAContainer}>
                <div className={classes.questionContainer}>
                    {props.questionData && props.questionData.question}
                    {!props.questionData && 'Loading...'}
                </div>
                <div className={`${classes.answersContainer} `}>
                    {props.questionData && props.questionData.answers.map((answer, index) => {
                        return (
                            <Button
                                color={answer.color}
                                disabled={answer.disabled && answer.answerText === ''}
                                onClick={props.onCheck}
                                key={answerToLetterRef[index]}
                                className={`${classes.answer} ${classes[answer.color]}`}
                                style={{ pointerEvents: answer.disabled ? 'none' : '' }}
                            >
                                <span className={`${answer.color !== 'warning' ? classes.letterRef : classes.selectedLetterRef}`}>
                                    {answerToLetterRef[index]}:&nbsp;</span>
                                <span className={classes.answerText}>{answer.answerText}</span>

                                {/* {`${answerToLetterRef[index]}: ${answer.answerText}`} */}
                            </ Button>
                        );
                    })}
                    {!props.questionData && answerToLetterRef.map((answer, index) => {
                        return <Button key={answerToLetterRef[index]} className={`${classes.answer} ${classes[answer.color]}`}>{`${answerToLetterRef[index]}:`}</ Button>
                    })}
                </div>
            </div>
        </div>

    );
};

export default QuestionAndAnswers;