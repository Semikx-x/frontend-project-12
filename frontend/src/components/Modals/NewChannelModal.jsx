import { Modal, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { closeModal, selectExtraData, selectOpen, selectType } from '../slices/ModalSlice.js';
import { addChannel, selectChannels } from '../slices/ChannelsSlice.js';
import { useTranslation } from 'react-i18next'
import { getChannelSchema } from '../Form/schema.js';
import { toast } from 'react-toastify'
import { Input } from '../input/Input.jsx'

const NewChannelModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectOpen)
  const type = useSelector(selectType)
  const extraData = useSelector(selectExtraData)
  const { t } = useTranslation()
  const channels = useSelector(selectChannels)

  if (!isOpen || type !== 'adding') return null;

  const handleClose = () => dispatch(closeModal());


  return (
    <Modal show={isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.newChanel')}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: extraData?.name || '' }}
        validationSchema={getChannelSchema(channels)}
        onSubmit={async (values) => {
          await dispatch(addChannel(values))
          toast(t('modal.newChanelSuccess'))
          handleClose();
        }}
      >
        {({ handleSubmit, handleChange, errors, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Input
                name="name"
                id="name"
                placeholder={t('modal.nameChanel')}
                label={t('modal.nameChanel')}>
              </Input>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-between">
              <div>
                <Button variant="secondary" onClick={handleClose} className="me-2">
                  {t('modal.abort')}
                </Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {t('modal.save')}
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