import { t } from 'i18next';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface DeleteButtonProps {
  handleDelete: () => void;
  disabled?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ handleDelete, disabled }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirmation = () => setShowConfirmation(true);
  const handleCloseConfirmation = () => setShowConfirmation(false);

  const handleDeleteWithConfirmation = () => {
    handleShowConfirmation();
  };

  const confirmAndDelete = () => {
    handleDelete();
    handleCloseConfirmation();
  };

  return (
    <>
      <Button variant="outline-danger" onClick={handleDeleteWithConfirmation} title="Delete" disabled={disabled}>
        <i className="fa fa-trash"></i>
      </Button>

      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('common.Are you sure you want to delete')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            {t('common.No')}
          </Button>
          <Button variant="danger" onClick={confirmAndDelete}>
            {t('common.Yes')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteButton;