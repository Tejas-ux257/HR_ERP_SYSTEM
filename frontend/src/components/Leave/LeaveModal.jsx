import Modal from "react-bootstrap/Modal";
import LeaveForm from "./LeaveForm";

const LeaveModal = ({ onClose, onSaved }) => {
    return (
        <Modal
            show={true}
            onHide={onClose}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Apply Leave
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <LeaveForm
                    onClose={onClose}
                    onSaved={onSaved}
                />
            </Modal.Body>
        </Modal>
    );
};

export default LeaveModal;