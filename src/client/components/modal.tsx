import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useAppDispatch, useAppSelector } from '../state/hooks';
import Actions from '../state/actions/actions';

const ModalCustom: () => JSX.Element = () => {
    const showModal = useAppSelector((state) => state.showModal);
    const error = useAppSelector((state) => state.modalError);
    const dispatch = useAppDispatch();

    const handleClose = () => dispatch(Actions.SetShowModal(false));
    return (
        <>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalCustom;
