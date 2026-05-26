import { Modal, Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { closeAddModal, selectAdding } from '../slices/ModalSlice.js'
import { addChannel, selectChannels } from '../slices/ChannelsSlice.js'
import { getChannelSchema } from '../Form/schema.js'
import Input from '../input/Input.jsx'

const NewChannelModal = () => {
  const dispatch = useDispatch()
  const type = useSelector(selectAdding)
  const { t } = useTranslation()
  const channels = useSelector(selectChannels)

  if (!type.isOpen) return null

  const handleClose = () => dispatch(closeAddModal())

  return (
    <Modal show={type.isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.newChanel')}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: type.extraData?.name || '' }}
        validationSchema={getChannelSchema(channels)}
        onSubmit={async (values) => {
          await dispatch(addChannel(values))
          toast(t('modal.newChanelSuccess'))
          handleClose()
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Input
                name="name"
                id="name"
                placeholder={t('modal.nameChanel')}
                label={t('modal.nameChanel')}
              />
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
  )
}

export default NewChannelModal
