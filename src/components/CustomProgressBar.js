import { Progress } from "reactstrap";
import classes from './CustomProgressBar.module.css'

const CustomProgressBar = props => {
    return (
        <div className={classes.barContainer}>
                <Progress className={classes.bar} value={props.value} />
        </div>
    )
};

export default CustomProgressBar;