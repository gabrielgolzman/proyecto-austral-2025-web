import { Toast, ToastContainer } from "react-bootstrap"

const ToastMessage = ({
    message,
    show,
    onClose,
}) => {
    return (
        <ToastContainer>
            <Toast bg="success"
                onClose={onClose}
                show={show}
                delay={2500}
                autohide>
                <Toast.Body className="text-white">{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ToastMessage