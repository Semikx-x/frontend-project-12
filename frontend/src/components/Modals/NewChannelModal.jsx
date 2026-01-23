import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { closeModal, selectExtraData, selectOpen, selectType } from '../slices/ModalSlice.js';
import { addChannel } from '../slices/ChannelsSlice.js';

const NewChannelModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectOpen)
  const type = useSelector(selectType)
  const extraData = useSelector(selectExtraData)

  if (!isOpen || type !== 'adding') return null;

  const handleClose = () => dispatch(closeModal());


  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Настройки канала</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: extraData?.name || '' }}
        onSubmit={async (values) => {
          await dispatch(addChannel(values))
          console.log(values);
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

export default NewChannelModal;