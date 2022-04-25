import React, { useState } from "react";
import "./../../style/style.scss"
import { Modal, Button } from "react-bootstrap";

const ModalView = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    You Win!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-center">Congratulation! You have finished in {props.currentDuration} seconds</p>
                <p className="text-center">The score of this game is {props.score}</p>
                <p className="text-center">The total of user score is {props.userScore}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalView