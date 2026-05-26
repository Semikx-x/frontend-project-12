import { Modal, Button, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import {
  turnOnEdit, selectIsEdit, openDeleteModal, closeEditModal, selectEditing,
} from '../slices/ModalSlice.js'
import { renameChannel, selectChannels, selectActive } from '../slices/ChannelsSlice.js'
import { getChannelSchema } from '../Form/schema.js'
import Input from '../input/Input.jsx'

const EditChannelModal = () => {
  const dispatch = useDispatch()
  const type = useSelector(selectEditing)
  const { t } = useTranslation()
  const channels = useSelector(selectChannels)
  const isEdit = useSelector(selectIsEdit)
  const chat = useSelector(selectActive)

  if (!type.isOpen) return null

  const handleClose = () => dispatch(closeEditModal())

  const turn = () => dispatch(turnOnEdit())

  const openDelModal = async () => {
    dispatch(openDeleteModal({ extraData: chat }))
  }

  return (
    <Modal show={type.isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.editChanel')}</Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{ name: type.extraData?.name || '' }}
        validationSchema={getChannelSchema(channels)}
        onSubmit={async (values) => {
          await dispatch(renameChannel({ id: type.extraData.id, name: values.name }))
          toast(t('modal.editChanelSuccess'))
          handleClose()
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Button variant="primary" onClick={turn}>
                {t('modal.rename')}
              </Button>
              <Input
                name="name"
                id="name"
                disabled={!isEdit}
                placeholder={t('modal.nameChanel')}
                label={t('modal.nameChanel')}
              />
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-between">
              <Button variant="secondary" onClick={openDelModal} disabled={isSubmitting}>
                {t('modal.delete')}
              </Button>

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

export default EditChannelModal
