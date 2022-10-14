import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CustomProgressBar from "./CustomProgressBar";
import classes from './DynamicModal.module.css';
import { answerToLetterRef } from "../util/variables";

const DynamicModal = props => {
    return (
        <Modal isOpen={props.modalProps.modalIsOpen}>
            <ModalHeader>{props.modalProps.title}</ModalHeader>
            <ModalBody className={classes.bodyContainer}>
                {!Array.isArray(props.modalProps.body) && <div>{props.modalProps.body}</div>}
                {Array.isArray(props.modalProps.body) && props.modalProps.body.map((element, index) => {
                    return (
                        <div className={classes.barContainer}>
                            <CustomProgressBar value={element} />
                            <div className={classes.percentage}>
                                {`${answerToLetterRef[index]}: ${element}%`}
                            </div>
                        </div>
                    );
                })}
            </ModalBody>
            <ModalFooter className={`${props.modalProps.resumeButtonText ? classes.exitFooter : ''}`}>
                <Button color="primary" onClick={props.modalProps.action}>{props.modalProps.buttonText}</Button>
                {props.modalProps.resumeButtonText &&
                    <Button onClick={props.modalProps.onResumeGame} color={props.modalProps.resumeColor}>{props.modalProps.resumeButtonText}</Button>
                }
            </ModalFooter>
        </Modal>
    );
};

export default DynamicModal;