import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeDeleteModal, selectDelete } from '../slices/ModalSlice.js';
import { deleteChannel } from '../slices/ChannelsSlice.js';

const ModalDelete = () => {
  const dispatch = useDispatch();
  const type = useSelector(selectDelete);
  const { t } = useTranslation();

  const handleClose = () => dispatch(closeDeleteModal());

  console.log('deleteLog');
  if (!type.isOpen) return null;

  const handleDelete = async () => {
    await dispatch(deleteChannel(type.extraData.id));
    toast(t('modal.deleteChanel'));
    handleClose();
  };

  return (
    <Modal show={type.isOpen} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{`${t('modal.youSure')} "${type.extraData.name}"?`}</Modal.Title>
      </Modal.Header>

      <Button variant="danger" onClick={handleDelete}>
        {t('modal.delete')}
      </Button>
    </Modal>
  );
};

export default ModalDelete;
