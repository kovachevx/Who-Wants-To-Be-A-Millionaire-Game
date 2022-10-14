import classes from './SumStairway.module.css';
import { sumStairway } from "../util/variables";
import { Button } from 'reactstrap';

const SumStairway = props => {
    return (
        <div className={classes.sumContainer}>
            <ul>
                {sumStairway.map((sum, index) =>
                    <li
                        key={sum}
                        className={`${props.questionIndex === index ? classes.currentSum : ''}
                         ${index === 4 || index === 9 || index === 14 ? classes.coloredCertainSum : ''}`}
                    >
                        {index + 1} - ${sum}
                    </li>
                ).reverse()}
            </ul>
            <div className={classes.certainSumContainer}>
                <div className={classes.coloredCertainSum}>Certain Prize:</div>
                <div>${props.certainSum}</div>
            </div>
            <div className={classes.exitButtonContainer}>
                <Button onClick={props.onExit} className={classes.exitButton} color={'danger'} >Exit Game</Button>
            </div>
        </div>
    );
};

export default SumStairway;