import { t } from 'i18next';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface DeleteButtonProps {
  onConfirm: () => void;
  children: React.ReactNode;
}

const ConfirmButton: React.FC<DeleteButtonProps> = ({ onConfirm, children}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirmation = () => setShowConfirmation(true);
  const handleCloseConfirmation = () => setShowConfirmation(false);

  const handleDeleteWithConfirmation = () => {
    handleShowConfirmation();
  };

  const confirmAndDelete = () => {
    onConfirm();
    handleCloseConfirmation();
  };

  return (
    <>
      <Button variant="btn btn-primary" onClick={handleDeleteWithConfirmation} title="Delete">
        {children}    
      </Button>

      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('common.Are you sure?')}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            {t('common.No')}
          </Button>
          <Button variant="btn btn-primary" onClick={confirmAndDelete}>
          {t('common.Yes')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmButton;