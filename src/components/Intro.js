import { Button } from "reactstrap";
import classes from "./Intro.module.css";

const Intro = props => {
    return (
        <div className={classes.introContainer}>
            <h1 className={classes.heading1}>WHO WANTS TO BE A MILLIONAIRE?</h1>
            <div className={classes.textContainer}>
                <p>
                    The popular game has been broadcasted in America for two decades and has its
                    loyal fans who follow the show regardless of the broadcast channel.
                    Sitting on the chair of fortune is a challenge that not everyone
                    would accept, but now absolutely everyone can try to fight the great
                    game in a free online version.
                </p>
                <p>
                    The game consists of 15 questions. The level of difficulty increases
                    with each subsequent one. The key to success is concentration and
                    calmness.
                </p>
                <p>You think you can answer all 15 questions? - Then play!</p>
            </div>
            <Button className={classes.playButton} color='warning' onClick={props.startGame}>Play</Button>
        </div>
    )
}

export default Intro;