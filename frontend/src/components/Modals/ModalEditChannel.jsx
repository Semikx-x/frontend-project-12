import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { closeModal } from '../slices/ModalSlice.js';
import { renameChannel, removeChannel } from '../slices/ChannelsSlice.js';

const EditChannelModal = () => {
  const dispatch = useDispatch();
  const { isOpen, type, extraData } = useSelector((state) => state.modals);

  if (!isOpen || type !== 'editing') return null;

  const handleClose = () => dispatch(closeModal());

  const handleDelete = async () => {
    if (window.confirm(`Вы уверены, что хотите удалить канал "${extraData.name}"?`)) {
      await dispatch(removeChannel(extraData.id));
      handleClose();
    }
  };

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Настройки канала</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: extraData?.name || '' }}
        onSubmit={async (values) => {
          await dispatch(renameChannel({ id: extraData.id, name: values.name }));
          handleClose();
        }}
      >
        {({ handleSubmit, handleChange, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Название канала</Form.Label>
                <Form.Control
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-between">
              <Button variant="danger" onClick={handleDelete} disabled={isSubmitting}>
                Удалить
              </Button>

              <div>
                <Button variant="secondary" onClick={handleClose} className="me-2">
                  Отмена
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Сохранить
                </Button>
              </div>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditChannelModal;