import React, { useState } from "react";
import "./../../style/style.scss"
import { Modal, Button } from "react-bootstrap";

const Popup = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Message
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-center">{props.message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-secondary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Popup