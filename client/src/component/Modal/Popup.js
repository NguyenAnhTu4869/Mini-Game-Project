import React, { Fragment, useState } from "react";
import "./../../style/style.scss"
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux-store/user/user.slice";

const Popup = (props) => {
    const userId = useSelector((state) => state.user.userId);
    const dispatch = useDispatch();

    // Update redux isAccepted
    const handleAcceptExchange = () => {
        dispatch(
            userActions.updateAcceptedExchange({ isAccepted: true})
        )
    }

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
                {
                    userId > 0 ?
                        <Button className="btn btn-primary"
                            onClick={() => {
                                props.onHide();
                                handleAcceptExchange();
                            }}>
                            Accept
                        </Button> :
                        <Fragment></Fragment>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default Popup