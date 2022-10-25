import { Button } from 'reactstrap';
import classes from './Hints.module.css';


const Hints = props => {
    return (
        <div className={`${classes.hintContainer} col-11`}>
            <div className={classes.heading}>
                <h1>WHO WANTS TO BE A MILLIONAIRE?</h1>
            </div>
            <div className={classes.hintButtonsContainer}>
                <Button onClick={props.onFiftyFifty} className={classes.hint} disabled={!props.questionData.length}>
                    50:50
                </Button>
                <Button onClick={props.onAskTheAudience} className={classes.hint} disabled={!props.questionData.length}>
                    {<i className="fa-solid fa-lg fa-users"></i>}
                </Button>
                <Button onClick={props.onCallAFriend} className={classes.hint} disabled={!props.questionData.length}>
                    <i className="fa-solid fa-lg fa-phone"></i>
                </Button>
            </div>
        </div>
    );
};

export default Hints;