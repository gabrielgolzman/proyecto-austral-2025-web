import { Button, Modal } from "react-bootstrap"

const DeleteModal = ({
    bookTitle,
    show,
    onCancel,
    onConfirm }) => {
    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Header>
                <Modal.Title>Confirmar eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Está seguro que desee eliminar el libro <b>{bookTitle}</b> ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
                <Button variant="danger" onClick={onConfirm}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteModal