import { t } from 'i18next';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface DeleteButtonProps {
  handle: () => void;
}

const CancelButton: React.FC<DeleteButtonProps> = ({ handle: handle }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirmation = () => setShowConfirmation(true);
  const handleCloseConfirmation = () => setShowConfirmation(false);

  const handleDeleteWithConfirmation = () => {
    handleShowConfirmation();
  };

  const confirm = () => {
    handle();
    handleCloseConfirmation();
  };

  return (
    <>
      <Button variant="outline-danger" onClick={handleDeleteWithConfirmation} title="Delete">
        {t("common.Cancel")}
      </Button>

      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>{t('common.Confirmation')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('common.Are You Sure You Want To Cancel')}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseConfirmation}>
            {t('common.No')}
          </Button>
          <Button variant="outline-success" onClick={confirm}>
            {t('common.Yes')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CancelButton;