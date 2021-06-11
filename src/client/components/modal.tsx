import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalCustom: (props: {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    error: string;
}) => JSX.Element = ({ showModal, setShowModal, error }) => {
    const handleClose = () => setShowModal(false);
    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
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
